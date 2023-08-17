# Grade Tracker

A mobile application to keep track of the grades and provide insights on the current performance. React Native; Native Base; SQLite; TypeScript

To cater to a wider range of users using Android and iOS, this cross-platform applicaton was developed with React Native.

<img width="539" alt="Screenshot 2023-08-17 at 6 26 49 PM" src="https://github.com/max172-hqt/grade-tracker/assets/55776151/dc071da0-9f29-47d0-aa03-075e4934e6e0">

## Group 8 Members

- Huy Tran
- Jefferson Verzosa
- Peiwen Zhou

## Features

- User can setup their semester courses
- User can create and set up different grade components for a subject and dates (example: 3 quizzes, 2 assignments, 2 exams)
- User can see the list of courses and overall performance (GPA, Letter Grade) for the semester
- User can update and see the grades for each grade component for each course
- User can see the weighted grade on every evaluation item.
- User can sort the list of subjects by the GPA or the subject name
- User can be notified based on the recently added grade
- User can see the remaining marks to achieve to pass the course or achieve a letter grade
- User can see different colours based on the current letter grade (A is green, B is brown...)
- User can put a due dates for grade components to remind themselves
- User can update application preferences such as theme
- Users can export data as CSV/JSON
- Users can import data as CSV/JSON
- Users can delete all their data on the app

## Terminology

- Grade components: Could be quizzes, exams, assignments, presentations
- Grade tracker sheet: A sheet which shows all grading components of a subject, along with
  a grade (can be empty) and a weight (percentage)

## Development guide

- Clone the project and install dependencies

```sh
npm install
```

- Start expo development server

```sh
npx expo start
```

- Or you can also run iOS and Android simulator with the following commands. For more information,
  refer to the Expo documentation and list of available commands on `package.json` file

```sh
npm run ios
npm run android
```

- Check errors with `eslint`

```sh
npm run lint
```

- Fix code style errors with `prettier`

```sh
npm run format
```

- This project also comes with a pre-commit to auto-fix eslint errors on staged file and will
  prevent you from committing if there are errors that have not been fixed.
