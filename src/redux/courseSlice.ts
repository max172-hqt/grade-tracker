import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Course, Grade } from '../types';
import { RootState } from './store';
import { getCurrentGradeProgress, calculateLetterGrade } from '../utils/gradesCalculation';

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
      state.courses.push(action.payload.course);
      state.grades.push(...action.payload.grades);
    },

    /**
     * Update actual grade
     */
    updateActualGrade: (state, action: PayloadAction<{ gradeId: number; actualScore: number }>) => {
      const { gradeId, actualScore } = action.payload;
      const gradeToUpdate = state.grades.find((grade) => grade.id === gradeId);
      if (gradeToUpdate) {
        gradeToUpdate.data.actualScore = actualScore;
      }
    },

    setSortOrder: (state, action: PayloadAction<'ALPHABETICAL' | 'GPA_HIGH_TO_LOW'>) => {
      state.sortOrder = action.payload;
    },

    deleteData: (state) => {
      state.courses = [];
      state.grades = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addCourse, setCourses, setGrades, updateActualGrade, setSortOrder, deleteData } =
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
    const coursesWithGPA = courses.map((course) => {
      const courseGrades = grades.filter((grade) => grade.courseId === course.id);
      const { percentage, currentLetterGrade } = getCurrentGradeProgress(courseGrades);
      return {
        ...course,
        percentage,
        currentLetterGrade,
      };
    });

    if (sortOrder === 'ALPHABETICAL') {
      return [...coursesWithGPA].sort((a, b) => a.data.name.localeCompare(b.data.name));
    } else if (sortOrder === 'GPA_HIGH_TO_LOW') {
      return [...coursesWithGPA].sort((a, b) => b.percentage - a.percentage);
    } else {
      return coursesWithGPA;
    }
  },
);
