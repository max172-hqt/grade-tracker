import * as SQLite from 'expo-sqlite';
import {
  CREATE_COURSE,
  CREATE_COURSES_TABLE_QUERY,
  CREATE_GRADE,
  CREATE_GRADES_TABLE_QUERY,
  DELETE_COURSE,
  SELECT_COURSES,
  SELECT_GRADES,
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
    },
    (error) => console.log('Error creating tables: ', error),
    () => console.log('Create tables successfully'),
  );

  db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () =>
    console.log('Foreign keys turned on'),
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
  const courseId = await createCourse(courseData.name, courseData.courseCode);
  if (!courseId) {
    throw new Error('Cannot create course');
  }
  const gradePromises: Promise<Grade>[] = [];

  for (const data of gradesData) {
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

export function deleteAllCourses() {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        DELETE_COURSE,
        [],
        (tx, resultSet) => {
          console.log(resultSet.rows);
          resolve(true);
        },
        (error) => {
          console.log(error);
          reject(false);
          return true;
        },
      );
    });
  });
}

// ============= HELPER =============

/**
 * @param name Course name
 * @param code Course code
 * @returns Newly created course id
 */
function createCourse(name: string, code: string): Promise<number | undefined> {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        CREATE_COURSE,
        [name, code],
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
