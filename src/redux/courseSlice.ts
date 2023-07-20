import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Course, Grade } from '../types';
import { RootState } from './store';
import { calculateGPA, getLetterGradeFromTotalWeightedScore } from '../utils/gradesCalculation';

export interface CourseState {
  courses: Course[];
  grades: Grade[];
}

export interface CoursePayloadData {
  course: Course;
  grades: Grade[];
}

export interface CourseState {
  courses: Course[];
  grades: Grade[];
  sortOrder: 'ALPHABETICAL' | 'GPA_HIGH_TO_LOW';
}

const initialState: CourseState = {
  courses: [],
  grades: [],
  sortOrder: 'ALPHABETICAL',
};

export const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload;
    },

    setGrades: (state, action: PayloadAction<Grade[]>) => {
      state.grades = action.payload;
    },

    /**
     * Add a new course and its grades to the store
     */
    addCourse: (state, action: PayloadAction<CoursePayloadData>) => {
      const { course, grades } = action.payload;

      // Calculate GPA for the new course
      const courseGPA = calculateGPA(course.id, grades);

      // Update the course with the calculated GPA and letterGrade
      const courseWithGPA: Course = {
        ...course,
        data: {
          ...course.data,
          letterGrade: getLetterGradeFromTotalWeightedScore(courseGPA),
        },
      };

      // state.courses.push(action.payload.course);
      state.courses.push(courseWithGPA);
      console.log('coursesWithGPA:::', courseWithGPA);

      // state.grades.push(...action.payload.grades);
      // If the grades array is not empty, add the new grades to the state
      if (grades.length > 0) {
        state.grades.push(...grades);
      }
    },

    /**
     * Update actual grade
     */
    updateActualGrade: (state, action: PayloadAction<{ gradeId: number; actualScore: number }>) => {
      const { gradeId, actualScore } = action.payload;
      const gradeToUpdate = state.grades.find((grade) => grade.id === gradeId);
      if (gradeToUpdate) {
        gradeToUpdate.data.actualScore = actualScore;

        // Recalculate the GPA and letterGrade for the affected course
        const courseId = gradeToUpdate.courseId;
        const gradesForCourse = state.grades.filter((grade) => grade.courseId === courseId);
        const courseGPA = calculateGPA(courseId, gradesForCourse);
        const letterGrade = getLetterGradeFromTotalWeightedScore(courseGPA);

        // Update the letterGrade property of the course
        const courseToUpdate = state.courses.find((course) => course.id === courseId);
        if (courseToUpdate) {
          courseToUpdate.data.letterGrade = letterGrade;
        }
      }
    },

    setSortOrder: (state, action: PayloadAction<'ALPHABETICAL' | 'GPA_HIGH_TO_LOW'>) => {
      state.sortOrder = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addCourse, setCourses, setGrades, updateActualGrade, setSortOrder } =
  courseSlice.actions;
export default courseSlice.reducer;

const selectGradesForCourseWithId = (state: RootState, courseId: number) =>
  state.course.grades.filter((grade) => grade.courseId === courseId);

export const selectGradesForCourseWithIdMemoized = createSelector(
  [selectGradesForCourseWithId],
  (course) => course,
  // (letterGrade) => letterGrade,
);

const selectCourseWithId = (state: RootState, courseId: number) =>
  state.course.courses.find((course) => course.id === courseId);

export const selectCourseWithIdMemoized = createSelector([selectCourseWithId], (course) => course);

const selectCourses = (state: RootState) => state.course.courses;
const selectGrades = (state: RootState) => state.course.grades;

export const selectSortedCourses = createSelector(
  [selectCourses, selectGrades, (state: RootState) => state.course.sortOrder],
  (courses, grades, sortOrder) => {
    const coursesWithGPA = courses.map((course) => ({
      ...course,
      gpa: calculateGPA(course.id, grades),
    }));
    if (sortOrder === 'ALPHABETICAL') {
      return [...coursesWithGPA].sort((a, b) => a.data.name.localeCompare(b.data.name));
    } else if (sortOrder === 'GPA_HIGH_TO_LOW') {
      return [...coursesWithGPA].sort((a, b) => b.gpa - a.gpa);
    } else {
      return coursesWithGPA;
    }
  },
);
