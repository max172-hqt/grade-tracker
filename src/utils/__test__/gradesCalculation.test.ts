import { expect, test } from '@jest/globals';
import { Grade } from '../../types';
import { getEstimateAverageGrade } from '../gradesCalculation';

const generateMockGrade = (currentWeight: number, totalWeight: number): Grade[] => [
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

test('Estimated average weight for the remaining of the course should be correct', () => {
  // complete the course
  const test_90_100 = getEstimateAverageGrade(generateMockGrade(90, 100));
  expect(test_90_100['A+']).toBe(0);

  // complete 50/60
  const test_50_60 = getEstimateAverageGrade(generateMockGrade(50, 60));
  expect(test_50_60['A+']).toBe(100);
  expect(test_50_60['A']).toBe(75);
  expect(test_50_60['D+']).toBe(12.5);
  expect(test_50_60['D']).toBe(0);

  // complete 85/90
  const test_85_90 = getEstimateAverageGrade(generateMockGrade(85, 90));
  expect(test_85_90['A+']).toBe(50);
  expect(test_85_90['A']).toBe(0);
  expect(test_85_90['D+']).toBe(0);
  expect(test_85_90['D']).toBe(0);

  // complete 79/90
  const test_79_90 = getEstimateAverageGrade(generateMockGrade(79, 90));
  expect(test_79_90['A+']).toBe(-1);
  expect(test_79_90['A']).toBe(10);
  expect(test_79_90['D+']).toBe(0);
  expect(test_79_90['D']).toBe(0);
});
