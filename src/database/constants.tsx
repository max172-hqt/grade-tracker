export const CREATE_COURSES_TABLE_QUERY = `
  CREATE TABLE IF NOT EXISTS COURSES (
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT,
    course_code TEXT,
    letter_Grade TEXT,
    units INTEGER
    
  )
`;

export const CREATE_GRADES_TABLE_QUERY = `
  CREATE TABLE IF NOT EXISTS GRADES (
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT,
    description TEXT,
    weight INTEGER,
    max_score INTEGER,
    actual_score INTEGER,
    course_id INTEGER,
    FOREIGN KEY(course_id) REFERENCES COURSES(id) ON DELETE CASCADE
  )
`;

export const SELECT_COURSES = `
    SELECT * FROM COURSES
`;

export const SELECT_GRADES = `
    SELECT * FROM GRADES
`;

export const CREATE_COURSE = `
  INSERT INTO COURSES (name, course_code, units, letter_Grade) values (?, ?, ?, ?)
`;

export const CREATE_GRADE = `
  INSERT INTO GRADES (name, weight, max_score, actual_score, course_id) values (?, ?, ?, ?, ?)
`;

export const DELETE_COURSE = 'DELETE FROM COURSES';

export const UPDATE_COURSE = `
  UPDATE COURSES SET letter_Grade = ? WHERE id = ? 
`;
