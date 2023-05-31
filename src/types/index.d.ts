// ========== ENTITIES ==========
export interface CourseData {
  name: string;
  courseCode: string;
}

export interface Course {
  id: number;
  data: CourseData;
}

export interface GradeData {
  name: string;
  description: string;
  weight: number;
  maxScore: number;
  actualScore: number | null;
}

export interface Grade {
  id: number;
  courseId: number;
  data: GradeData;
}

// ========== PROPS ==========
export interface CourseItemProps {
  course: Course | null;
  handleGoToCourseDetail: () => void;
}
