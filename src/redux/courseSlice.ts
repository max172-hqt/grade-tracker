import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Course, Grade } from '../types';
import { RootState } from './store';

export interface CourseState {
  currentCourse: Course | null | undefined;
  courses: Course[];
  grades: Grade[];
}

export interface CoursePayloadData {
  course: Course;
  grades: Grade[];
}

const initialState: CourseState = {
  currentCourse: null,
  courses: [],
  grades: [],
};

export const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    /**
     * Set the current course, used when see a course detail
     */
    setCurrentCourse: (state, action: PayloadAction<number>) => {
      const course = state.courses.find((course) => course.id === action.payload);
      state.currentCourse = course;
    },

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
      const gradeIndex = state.grades.findIndex((grade) => grade.id === gradeId);
      if (gradeIndex !== -1) {
        state.grades[gradeIndex].data.actualScore = actualScore;
      }
    },

    /**
     * Update max grade
     */
    updateMaxGrade: (state, action: PayloadAction<{ gradeId: number; maxScore: number }>) => {
      const { gradeId, maxScore } = action.payload;
      const gradeIndex = state.grades.findIndex((grade) => grade.id === gradeId);
      if (gradeIndex !== -1) {
        state.grades[gradeIndex].data.maxScore = maxScore;
      }
    },

    /**
     * Update grade weight
     */
    updateGradeWeight: (state, action: PayloadAction<{ gradeId: number; weight: number }>) => {
      const { gradeId, weight } = action.payload;
      const gradeIndex = state.grades.findIndex((grade) => grade.id === gradeId);
      if (gradeIndex !== -1) {
        state.grades[gradeIndex].data.weight = weight;
      }
    },

    /**
     * TODO: Need to add actions for
     * - Create grade components
     * - Update actual grade
     * - Update weight and max for a grade
     */
  },
});

// Action creators are generated for each case reducer function
export const {
  setCurrentCourse,
  addCourse,
  setCourses,
  setGrades,
  updateActualGrade,
  updateMaxGrade,
  updateGradeWeight,
} = courseSlice.actions;
export default courseSlice.reducer;

export const selectGradesForCourseWithId = (state: RootState, courseId: number) =>
  state.course.grades.filter((grade) => grade.courseId === courseId);
