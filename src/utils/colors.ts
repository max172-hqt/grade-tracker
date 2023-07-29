export const gradeColors = {
  'A+': 'green.500',
  A: 'green.700',
  'B+': 'yellow.600',
  B: 'yellow.600',
  'C+': 'yellow.500',
  C: 'yellow.500',
  'D+': 'amber.800',
  D: 'amber.800',
  F: 'red.500',
};

export const gpaColors = {
  'A+': 'green.500',
  A: 'green.700',
  'B+': 'yellow.600',
  B: 'yellow.600',
  'C+': 'yellow.500',
  C: 'yellow.500',
  'D+': 'amber.800',
  D: 'amber.800',
  F: 'red.500',
};

export const getGPAColors = (gpa: number) => {
  if (gpa >= 4) {
    return 'green.500';
  } else if (gpa >= 3.0) {
    return 'yellow.600';
  } else if (gpa >= 2) {
    return 'yellow.500';
  } else if (gpa >= 1.0) {
    return 'amber.800';
  } else {
    return 'red.500';
  }
};

export const getGPAColorsHex = (gpa: number) => {
  if (gpa >= 4.0) {
    return '#22c55e';
  } else if (gpa >= 3.0) {
    return '#ca8a04';
  } else if (gpa >= 2) {
    return '#eab308';
  } else if (gpa >= 1.0) {
    return '#92400e';
  } else {
    return '#ef4444';
  }
};

export const gradeColorsHex = {
  'A+': '#22c55e',
  A: '#22c55e',
  'B+': '#ca8a04',
  B: '#ca8a04',
  'C+': '#eab308',
  C: '#eab308',
  'D+': '#92400e',
  D: '#92400e',
  F: '#ef4444',
};

export const themeColors = {
  dark: {
    bg: '#111827',
    headerBg: '#111827',
    text: '#e7e5e4',
  },
  light: {
    bg: 'rgb(250, 250, 249)',
    headerBg: 'rgb(250, 250, 249)',
    text: 'rgba(23,23,23,1.00)',
  },
};
