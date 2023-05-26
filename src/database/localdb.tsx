import * as SQLite from 'expo-sqlite';
import { CREATE_COURSES_TABLE_QUERY, CREATE_GRADES_TABLE_QUERY } from './constants';
import type { Course, Grade } from '../types';

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
}

/**
 * @param name Course name
 * @param code Course code
 * @returns Newly created course
 */
export async function createCourse(name: string, code: string): Promise<Course | null> {
  return null;
}

// TODO: Create grade rows in Grades table
export async function createGrades(grades: Grade[]) {}

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
