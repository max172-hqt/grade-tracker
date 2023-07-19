// ========== ENTITIES ==========
export interface CourseData {
  name: string;
  courseCode: string;
  units: number;
  letterGrade: string;
}

export interface Course {
  grades(grades: any): { currentLetterGrade: any };
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
  courseid: number;
  handleGoToCourseDetail: (courseId: number) => void;
}

export interface SetupGradeItemProps {
  tempId: number;
  grade: GradeData;
  handleUpdateGrade: (id: number, grade: GradeData) => void;
  handleDeleteGrade: (id: number) => void;
}

export interface EditGradeModalProps {
  title: string;
  grade: GradeData | null;
  isModalOpen: boolean;
  onCloseModal: () => void;
  onSavePressed: (name: string, maxScore: number, weight: number) => void;
}

export interface DetailGradeItemProps {
  grade: Grade;
  showWeighted: boolean;
}
