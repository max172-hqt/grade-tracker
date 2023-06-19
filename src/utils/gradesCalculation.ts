import { Grade, CourseSummary } from '../types';
export const getLetterGrade = (percentage: number) => {
  // Round to the nearest integer
  percentage = Math.round(percentage);

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

export const getWeightedPercentage = (grade: number, maxGrade: number) => {
  return (grade / maxGrade) * 100;
};

export const calculateCourseSummary = (grades: Grade[]): CourseSummary => {
  let totalScore = 0;
  grades.forEach((grade) => {
    if (grade.data.actualScore && grade.data.weight) {
      totalScore += (grade.data.actualScore / grade.data.maxScore) * grade.data.weight;
    }
  });

  const percentage = (totalScore / 100) * 100;
  const remainingScore = Math.max(50 - totalScore, 0);
  const letterGrade = getLetterGrade(percentage);

  return {
    totalScore,
    percentage,
    remainingScore,
    letterGrade,
  };
};
