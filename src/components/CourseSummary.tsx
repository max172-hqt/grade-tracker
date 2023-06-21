import { Box, Progress, Text } from 'native-base';
import type { Grade } from '../types';
import {
  getCurrentGradeProgress,
  getEstimateAverageGrade,
  getNextLetterGrade,
} from '../utils/gradesCalculation';

export default function CourseSummary({ grades }: { grades: Grade[] }) {
  const {
    totalWeightCompleted,
    totalWeightAchieved,
    currentLetterGrade,
    percentage,
    allGradesCompleted,
  } = getCurrentGradeProgress(grades);

  const estimateAverageGrade = getEstimateAverageGrade(grades);

  const nextLetterGrade = getNextLetterGrade(currentLetterGrade);

  return (
    <Box mt={4} mb={15}>
      {grades.some((grade) => grade.data.actualScore !== null) && (
        <>
          <Progress value={totalWeightAchieved} size="lg" colorScheme="teal" />
          <Text mt={2} fontWeight="bold" textAlign="center">
            Current Score: {totalWeightAchieved.toFixed(2)} / {totalWeightCompleted.toFixed(2)} (
            {percentage !== 0 ? percentage.toFixed(2) + '%' : 'N/A'})
          </Text>
          <Text mt={2} fontWeight="bold" textAlign="center">
            Current performance: {currentLetterGrade}
          </Text>
          {!allGradesCompleted && (
            <>
              {nextLetterGrade !== null && (
                <Text mt={2} fontWeight="bold" textAlign="center">
                  Average score to achieve {nextLetterGrade}:{' '}
                  {estimateAverageGrade[nextLetterGrade] !== -1
                    ? estimateAverageGrade[nextLetterGrade]?.toFixed(2)
                    : 'N/A'}
                  %
                </Text>
              )}
              {currentLetterGrade !== 'F' && (
                <Text mt={2} fontWeight="bold" textAlign="center">
                  Average score to maintain {currentLetterGrade}:{' '}
                  {estimateAverageGrade[currentLetterGrade] !== -1
                    ? estimateAverageGrade[currentLetterGrade]?.toFixed(2)
                    : 'N/A'}
                  %
                </Text>
              )}
            </>
          )}
        </>
      )}
    </Box>
  );
}
