/* eslint-disable prettier/prettier */
/* eslint-disable indent */
import type { Grade, GradeData } from '../types';

export const getLetterGrade = (percentage: number, roundUp = false) => {
  // Round to the nearest integer
  if (roundUp) {
    percentage = Math.round(percentage);
  }

  let ret: string;

  if (percentage < 50) {
    ret = 'F';
  } else if (percentage < 55) {
    ret = 'D';
  } else if (percentage < 60) {
    ret = 'D+';
  } else if (percentage < 65) {
    ret = 'C';
  } else if (percentage < 70) {
    ret = 'C+';
  } else if (percentage < 75) {
    ret = 'B';
  } else if (percentage < 80) {
    ret = 'B+';
  } else if (percentage < 90) {
    ret = 'A';
  } else {
    ret = 'A+';
  }

  return ret;
};

export const getLetterValue = (letGrade: string) => {
  let letGradeVal: number;
  switch (letGrade) {
    case 'A+':
      letGradeVal = 4.2;
      break;
    case 'A':
      letGradeVal = 4.0;
      break;
    case 'B+':
      letGradeVal = 3.5;
      break;
    case 'B':
      letGradeVal = 3;
      break;
    case 'C+':
      letGradeVal = 2.5;
      break;
    case 'C':
      letGradeVal = 2.0;
      break;
    case 'D+':
      letGradeVal = 1.5;
      break;
    case '5':
      letGradeVal = 1;
      break;
    default:
      letGradeVal = 0;
  }

  return letGradeVal;
};

export const getWeightedPercentage = (grade: number, maxGrade: number) => {
  return (grade / maxGrade) * 100;
};

export const getNextLetterGrade = (letterGrade: string) => {
  const grades = ['F', 'D', 'D+', 'C', 'C+', 'B', 'B+', 'A', 'A+'];
  const index = grades.findIndex((grade) => grade === letterGrade);

  if (index === -1 || index === grades.length - 1) {
    return null;
  }

  return grades[index + 1];
};

/**
 * Get Weighted amount achieve for a grade (e.g: 7.5% / 10%)
 * @param grade Grade
 * @returns number: Weighted amount achieve for a grade
 */
export const getWeighted = (grade: Grade) => {
  if (grade.data.actualScore !== null) {
    const ans = (grade.data.actualScore / grade.data.maxScore) * grade.data.weight;
    return ans.toFixed(2) + '%';
  }
  return '-';
};

export const getLetterForGrade = (grade: Grade) => {
  if (grade.data.actualScore !== null) {
    return getLetterGrade((grade.data.actualScore / grade.data.maxScore) * 100);
  }
  return '-';
};

/**
 * Get total weight and score achieved so far
 * For example, the student completed 60% of the course total weight and got 50%,
 * it will return { totalWeightCompleted: 60, totalWeightAchieved: 50 }
 *
 * @param grades List of grades
 * @returns object
 */
export const getCurrentGradeProgress = (grades: Grade[]) => {
  let totalWeightCompleted = 0;
  let totalWeightAchieved = 0;
  let allGradesCompleted = true;
  console.log('grades');
  console.log(grades);

  // grades.forEach((grade) => {});

  grades.forEach((grade) => {
    console.log('gradesCalculation: grade.courseID:', grade.courseId);

    if (grade.data.actualScore !== null && grade.data.weight !== null) {
      totalWeightAchieved += (grade.data.actualScore / grade.data.maxScore) * grade.data.weight;
      totalWeightCompleted += grade.data.weight;
    } else {
      allGradesCompleted = false;
    }
  });

  const percentage =
    totalWeightCompleted === 0
      ? 0
      : (totalWeightAchieved / Math.min(totalWeightCompleted, 100)) * 100;

  const currentLetterGrade = getLetterGrade(percentage, true);

  return {
    totalWeightCompleted,
    totalWeightAchieved,
    currentLetterGrade,
    percentage,
    allGradesCompleted,
  };
};

/**
 * Get total course weight by summing all grade components' weights
 *
 * @param grade List of grades
 * @returns Total course weight
 */
export function getTotalCourseWeight(grade: Grade[]) {
  return grade.reduce((curr, grade) => curr + grade.data.weight, 0);
}

export function getTotalCourseWeightGradeData(grade: GradeData[]) {
  return grade.reduce((curr, grade) => curr + grade.weight, 0);
}

/**
 * Get the estimated average grades needed for the rest of the course
 * to achieve a letter grade
 *
 * If it's impossible to achieve the next letter grade, return -1
 *
 * @param grades List of grades
 */
export const getEstimateAverageGrade = (grades: Grade[]) => {
  const { totalWeightCompleted, totalWeightAchieved } = getCurrentGradeProgress(grades);
  const totalCourseWeight = getTotalCourseWeight(grades);

  const GRADE_THRESHOLD = {
    'A+': 90,
    A: 80,
    'B+': 75,
    B: 70,
    'C+': 65,
    C: 60,
    'D+': 55,
    D: 50,
  };

  const result: Record<string, number> = {};
  const remainingCourseWeight = totalCourseWeight - totalWeightCompleted;

  Object.keys(GRADE_THRESHOLD).forEach((grade: string) => {
    // Calculate the remaining weight needed to achieve each letter grade
    const remainingWeightNeeded =
      GRADE_THRESHOLD[grade as keyof typeof GRADE_THRESHOLD] - totalWeightAchieved;

    if (remainingWeightNeeded <= 0) {
      // Already achieve this letter grade even when all grades are 0
      result[grade] = 0;
    } else if (remainingWeightNeeded > remainingCourseWeight) {
      // Cannot achieve the next letter grade
      result[grade] = -1;
    } else {
      result[grade] = (remainingWeightNeeded / remainingCourseWeight) * 100;
    }
  });

  return result;
};

// Function to calculate LetterGrade for a course based on its grades
export const calculateLetterGrade = (courseId: number, grades: Grade[]) => {
  const gradesForCourse = grades.filter((grade) => grade.courseId === courseId);
  if (gradesForCourse.length === 0) {
    return 'NA';
  }

  const totalWeightedScore = gradesForCourse.reduce((acc, grade) => {
    if (grade.data.actualScore !== null) {
      const gradePercentage =
        (grade.data.actualScore / grade.data.maxScore) * (grade.data.weight / 100);
      return acc + gradePercentage;
    }
    return acc;
  }, 0);

  const courseLetGrade = getLetterGrade(totalWeightedScore * 100, true);
  console.log('gradesComputation totalWeightedScore:', totalWeightedScore);

  console.log('gradesComputation courseLetGrade:', courseLetGrade);
  // const totalWeightedScorePercentage = (totalWeightedScore / gradesForCourse.length) * 100;
  return courseLetGrade;
};
