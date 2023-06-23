# Grade Tracker

A mobile application that displays a student grade status in the middle and at the end of the semester. With this utility, the student may be prompted if there is a need to study hard towards the end of the semester, or be notified of it’s current good standing.

This mobile application is designed to track student progress in every courses they take in their program. With simple initial setup at the start of the semester, the user will be able to input the marks as they are released every after evaluations. This app will then calculcate the progress of the user, and displays it in different format ( computed grades and letter equivalent).

To cater to a wider range of users using Android and iOS, this cross-platform applicaton was developed with React Native.

![Screenshot 2023-06-23 at 12 21 03 AM](https://github.com/max172-hqt/grade-tracker/assets/55776151/64f558ab-1774-4c94-935e-7daa330c5088)

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
