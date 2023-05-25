import * as SQLite from 'expo-sqlite';
import { CREATE_COURSES_TABLE_QUERY, CREATE_GRADES_TABLE_QUERY } from './constants';

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

export async function createCourse(name: string, code: string) {}
