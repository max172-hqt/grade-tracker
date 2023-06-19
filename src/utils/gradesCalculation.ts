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
  let preScore = 0;
  let preLetter = '';
  grades.forEach((grade) => {
    if (grade.data.actualScore && grade.data.weight) {
      totalScore += (grade.data.actualScore / grade.data.maxScore) * grade.data.weight;
    }
  });
  const letterGrade = getLetterGrade(totalScore);
  if (letterGrade === 'F') {
    preScore = 50;
    preLetter = 'D';
  } else if (letterGrade === 'D') {
    preScore = 55;
    preLetter = 'D+';
  } else if (letterGrade === 'D+') {
    preScore = 60;
    preLetter = 'C';
  } else if (letterGrade === 'C') {
    preScore = 65;
    preLetter = 'C+';
  } else if (letterGrade === 'C+') {
    preScore = 70;
    preLetter = 'B';
  } else if (letterGrade === 'B') {
    preScore = 75;
    preLetter = 'B+';
  } else if (letterGrade === 'B+') {
    preScore = 80;
    preLetter = 'A';
  } else if (letterGrade === 'A') {
    preScore = 90;
    preLetter = 'A+';
  }
  const percentage = (totalScore / 100) * 100;
  const remainingScore = Math.max(preScore - totalScore, 0);

  return {
    totalScore,
    percentage,
    remainingScore,
    letterGrade,
    preLetter,
  };
};
