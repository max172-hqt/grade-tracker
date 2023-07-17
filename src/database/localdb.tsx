import * as SQLite from 'expo-sqlite';
import {
  CREATE_COURSE,
  CREATE_COURSES_TABLE_QUERY,
  CREATE_GRADE,
  CREATE_GRADES_TABLE_QUERY,
  SELECT_COURSES,
  SELECT_GRADES,
  UPDATE_COURSE,
} from './constants';
import type { Course, CourseData, Grade, GradeData } from '../types';

const VERSION = '1.0';

let db: SQLite.WebSQLDatabase;
/**
 * Initialize database
 */
export async function initDatabase() {
  db = SQLite.openDatabase('db.gradetracker', VERSION);

  db.transaction(
    (tx) => {
      tx.executeSql(CREATE_COURSES_TABLE_QUERY, []);
      tx.executeSql(CREATE_GRADES_TABLE_QUERY, []);
      // console.log('select courses');
      tx.executeSql(SELECT_COURSES, []);
    },
    (error) => console.log('Error creating tables: ', error),
    () => console.log('Create tables successfully'),
  );
}

export async function getAllCourses(): Promise<Course[]> {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        SELECT_COURSES,
        [],
        (_, resultSet) => {
          const courses: Course[] = [];
          resultSet.rows._array.forEach((data) => {
            courses.push({
              id: data.id,
              data: {
                name: data.name,
                courseCode: data.course_code,
                units: data.units,
                letterGrade: data.letterGrade,
              },
            });
          });
          resolve(courses);
        },
        (_, error) => {
          reject(error);
          return false;
        },
      );
    });
  });
}

export async function getAllGrades(): Promise<Grade[]> {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        SELECT_GRADES,
        [],
        (_, resultSet) => {
          const grades: Grade[] = [];
          console.log(resultSet.rows._array);
          resultSet.rows._array.forEach((data) => {
            grades.push({
              id: data.id,
              data: {
                name: data.name,
                description: data.description,
                weight: data.weight,
                maxScore: data.max_score,
                actualScore: data.actual_score,
              },
              courseId: data.course_id,
            });
          });
          resolve(grades);
        },
        (_, error) => {
          reject(error);
          return false;
        },
      );
    });
  });
}

export async function createGradesForCourse(
  courseData: CourseData,
  gradesData: GradeData[],
): Promise<{ course: Course; grades: Grade[] } | undefined> {
  const courseId = await createCourse(
    courseData.name,
    courseData.courseCode,
    courseData.units,
    courseData.letterGrade,
  );
  if (!courseId) {
    throw new Error('Cannot create course');
  }
  const gradePromises: Promise<Grade>[] = [];

  for (const data of gradesData) {
    console.log(data);
    gradePromises.push(
      new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            CREATE_GRADE,
            [data.name, data.weight, data.maxScore, data.actualScore, courseId],
            (_, resultSet) => {
              if (resultSet.insertId) {
                resolve({ id: resultSet.insertId, courseId, data });
              } else {
                reject('Cannot create grade');
              }
            },
            (_, error) => {
              reject(error);
              return false;
            },
          );
        });
      }),
    );
  }

  const grades = await Promise.all(gradePromises);

  return {
    course: {
      id: courseId,
      data: courseData,
    },
    grades,
  };
}

/**
 * Debug functions
 */
export async function debugTableSchema() {
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM SQLITE_SCHEMA',
      [],
      (tx, resultSet) => {
        console.log(resultSet.rows);
      },
      (error) => {
        console.log(error);
        return true;
      },
    );
  });
}

// ============= HELPER =============

/**
 * @param name Course name
 * @param code Course code
 * @param units Course equivalent units
 * @param letterGrade Letter Grade record
 * @returns Newly created course id
 */
function createCourse(
  name: string,
  code: string,
  units: number,
  letter_Grade: string,
): Promise<number | undefined> {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        CREATE_COURSE,
        [name, code, units, letter_Grade],
        (_, resultSet) => {
          resolve(resultSet.insertId);
        },
        (_, error) => {
          reject(error);
          return false;
        },
      );
    });
  });
}

export function updateCourse(letterGrade: string, code: number): Promise<number | undefined> {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        // UPDATE_COURSE,
        'UPDATE courses SET letter_Grade = ? WHERE id = ?',
        [letterGrade, code],
        (_, resultSet) => {
          resolve(resultSet.rowsAffected);
          console.log('course letter grade updated');
        },
        (_, error) => {
          reject(error);
          console.log(error);
          console.log('update eror here');
          return false;
        },
      );
      tx.executeSql(
        // UPDATE_COURSE,
        'SELECT * FROM courses WHERE letter_Grade = ?',
        [letterGrade],
        (_, resultSet) => {
          resolve(resultSet.rowsAffected);
          console.log('displayed');
          console.log('SELECT * FROM courses WHERE letter_Grade =', letterGrade);
          console.log(resultSet);
        },
        (_, error) => {
          reject(error);
          console.log(error);
          console.log('select eror here');
          return false;
        },
      );
    });
    console.log('updated here ', letterGrade);
  });
}

export const updateCourse2 = (letterGrade: string, code: number) => {
  return new Promise<void>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE courses SET letter_Grade = ? WHERE id = ?',
        [letterGrade, code],
        (_, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            console.log(resultSet);
            console.log('update version 2');
            resolve();
          }
        },
        (_, error) => {
          console.error(error);
          reject(error);
          return true;
        },
      );
    });
  });
};

export function updateCourse3(letterGrade: string, code: number): Promise<number> {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        // 'UPDATE courses SET letter_Grade = ? WHERE id = ?',
        UPDATE_COURSE,
        [letterGrade, code],
        (_, resultSet) => {
          console.log('course letter grade updated');
          console.log(resultSet);
          resolve(resultSet.rowsAffected);
        },
        (_, error) => {
          console.log(error);
          console.log('update error here');
          reject(error);
        },
      );
    });
  });
}

export const updateGradeActualScore = (gradeId: number, actualScore: number) => {
  return new Promise<void>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE grades SET actual_score = ? WHERE id = ?',
        [actualScore, gradeId],
        (_, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            resolve();
          }
        },
        (_, error) => {
          console.error(error);
          reject(error);
          return true;
        },
      );
    });
  });
};
