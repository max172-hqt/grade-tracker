export const CREATE_COURSES_TABLE_QUERY = `
  CREATE TABLE IF NOT EXISTS COURSES (
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT,
    course_code TEXT
  )
`;

export const CREATE_GRADES_TABLE_QUERY = `
  CREATE TABLE IF NOT EXISTS GRADES (
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT,
    description TEXT,
    weight INTEGER,
    max_score REAL,
    actual_score INTEGER,
    course_id INTEGER,
    FOREIGN KEY(course_id) REFERENCES COURSES(id)
  )
`;
