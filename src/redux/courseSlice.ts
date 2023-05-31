import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Course, Grade } from '../types';
import { RootState } from './store';

export interface CourseState {
  currentCourse: Course | null | undefined;
  courses: Course[];
  grades: Grade[];
}

// TODO: Delete when creating databases
const sampleState: CourseState = {
  currentCourse: null,
  courses: [
    {
      id: 1,
      data: {
        name: 'Android',
        courseCode: 'INFO-100',
      },
    },
  ],
  grades: [],
};

const initialState = sampleState;

// const initialState: CourseState = {
//   currentCourse: null,
//   courses: [],
//   grades: [],
// };

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
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentCourse } = courseSlice.actions;
export default courseSlice.reducer;

export const selectGradesForCourseWithId = (state: RootState, courseId: number) =>
  state.course.grades.filter((grade) => grade.courseId === courseId);
