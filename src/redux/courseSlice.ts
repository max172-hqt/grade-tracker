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

// - TODO: Delete when creating databases
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
    {
      id: 2,
      data: {
        name: 'IOS',
        courseCode: 'INFO-101',
      },
    },
    {
      id: 3,
      data: {
        name: 'Mobile Security',
        courseCode: 'INFO-102',
      },
    },
  ],
  grades: [
    {
      id: 1,
      courseId: 1,
      data: {
        name: 'Quiz 1',
        description: '',
        weight: 10,
        maxScore: 10,
        actualScore: null,
      },
    },
    {
      id: 2,
      courseId: 1,
      data: {
        name: 'Quiz 2',
        description: '',
        weight: 10,
        maxScore: 10,
        actualScore: null,
      },
    },
    {
      id: 3,
      courseId: 1,
      data: {
        name: 'Exam',
        description: '',
        weight: 70,
        maxScore: 10,
        actualScore: null,
      },
    },
  ],
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

    /**
     * Add a new course and its grades to the store
     */
    addCourse: (state, action: PayloadAction<CoursePayloadData>) => {
      state.courses.push(action.payload.course);
      state.grades.push(...action.payload.grades);
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
export const { setCurrentCourse, addCourse } = courseSlice.actions;
export default courseSlice.reducer;

export const selectGradesForCourseWithId = (state: RootState, courseId: number) =>
  state.course.grades.filter((grade) => grade.courseId === courseId);
