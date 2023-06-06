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
  actualScore: number | null;

  tempId?: number;
  description?: string;
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
  // handleEditGradeItem: (id: number, name: string, weight: number, maxScore: number) => void;
  // handledAddGradeItem: (id: number) => void;
}
