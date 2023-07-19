import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Course, Grade } from '../types';
import { RootState } from './store';

export interface CourseState {
  courses: Course[];
  grades: Grade[];
}

export interface CoursePayloadData {
  course: Course;
  grades: Grade[];
}

const initialState: CourseState = {
  courses: [],
  grades: [],
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
  },
});

// Action creators are generated for each case reducer function
export const { addCourse, setCourses, setGrades, updateActualGrade } = courseSlice.actions;
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
