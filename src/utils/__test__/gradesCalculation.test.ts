import { expect, test } from '@jest/globals';
import { Grade } from '../../types';
import {
  getCurrentGradeProgress,
  getEstimateAverageGrade,
  getLetterForGrade,
  getWeighted,
} from '../gradesCalculation';

const generateGrade = ({
  actualScore,
  maxScore,
  weight,
}: {
  actualScore: number | null;
  maxScore: number;
  weight: number;
}) => {
  return {
    id: 1,
    data: {
      name: 'Quiz 1',
      weight,
      maxScore,
      actualScore,
    },
    courseId: 1,
  };
};

const generateMockGrades = (currentWeight: number, totalWeight: number): Grade[] => [
  {
    id: 1,
    data: {
      name: 'Quiz 1',
      weight: totalWeight,
      maxScore: 30,
      actualScore: 30 * (currentWeight / totalWeight),
    },
    courseId: 1,
  },
  {
    id: 2,
    data: {
      name: 'Quiz 2',
      weight: 100 - totalWeight,
      maxScore: 30,
      actualScore: null,
    },
    courseId: 1,
  },
];

test('getLetterForGrade', () => {
  expect(getLetterForGrade(generateGrade({ actualScore: 90, maxScore: 100, weight: 10 }))).toBe(
    'A+',
  );

  expect(getLetterForGrade(generateGrade({ actualScore: 79.999, maxScore: 100, weight: 10 }))).toBe(
    'B+',
  );

  expect(getLetterForGrade(generateGrade({ actualScore: 49.999, maxScore: 100, weight: 10 }))).toBe(
    'F',
  );

  expect(getLetterForGrade(generateGrade({ actualScore: 50, maxScore: 100, weight: 10 }))).toBe(
    'D',
  );

  expect(getLetterForGrade(generateGrade({ actualScore: null, maxScore: 100, weight: 10 }))).toBe(
    '-',
  );
});

test('getWeighted', () => {
  expect(getWeighted(generateGrade({ actualScore: 90, maxScore: 100, weight: 10 }))).toBe('9.00%');
  expect(getWeighted(generateGrade({ actualScore: 89, maxScore: 90, weight: 10 }))).toBe('9.89%');
  expect(getWeighted(generateGrade({ actualScore: 0, maxScore: 90, weight: 10 }))).toBe('0.00%');
  expect(getWeighted(generateGrade({ actualScore: null, maxScore: 90, weight: 10 }))).toBe('-');
});

test('getCurrentGradeProgress', () => {
  const test_90_100 = getCurrentGradeProgress(generateMockGrades(90, 100));
  expect(test_90_100.currentLetterGrade).toBe('A+');
  expect(test_90_100.totalWeightAchieved).toBe(90);
  expect(test_90_100.totalWeightCompleted).toBe(100);

  const test_80_90 = getCurrentGradeProgress(generateMockGrades(80, 90));
  expect(test_80_90.currentLetterGrade).toBe('A');
  expect(test_80_90.totalWeightAchieved).toBe(80);
  expect(test_80_90.totalWeightCompleted).toBe(90);
});

test('getEstimateAverageGrade', () => {
  // complete the course
  const test_90_100 = getEstimateAverageGrade(generateMockGrades(90, 100));
  expect(test_90_100['A+']).toBe(0);

  // complete 50/60
  const test_50_60 = getEstimateAverageGrade(generateMockGrades(50, 60));
  expect(test_50_60['A+']).toBe(100);
  expect(test_50_60['A']).toBe(75);
  expect(test_50_60['D+']).toBe(12.5);
  expect(test_50_60['D']).toBe(0);

  // complete 85/90
  const test_85_90 = getEstimateAverageGrade(generateMockGrades(85, 90));
  expect(test_85_90['A+']).toBe(50);
  expect(test_85_90['A']).toBe(0);
  expect(test_85_90['D+']).toBe(0);
  expect(test_85_90['D']).toBe(0);

  // complete 79/90
  const test_79_90 = getEstimateAverageGrade(generateMockGrades(79, 90));
  expect(test_79_90['A+']).toBe(-1);
  expect(test_79_90['A']).toBe(10);
  expect(test_79_90['D+']).toBe(0);
  expect(test_79_90['D']).toBe(0);
});
