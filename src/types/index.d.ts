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
  weight: number;
  maxScore: number;

  tempId?: number;
  description?: string;
  actualScore?: number;
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

export interface GradeItemProps {
  tempId: number;
  grade: GradeData;
  handleAddGrade: (grade: GradeData) => void;
  handleUpdateGrade: (id: number, grade: GradeData) => void;
  handleDeleteGrade: (id: number) => void;
}
