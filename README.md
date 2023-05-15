# Grade Tracker
A mobile application that displays a student grade status  in the middle and at the end of the semester. With this utility, the student may be prompted if there is a need to study hard towards the end of the semester, or be notified of it’s current good standing. 
<!-- TODO: Write description -->

## Group 8 Members
- Huy Tran
- Jefferson Verzosa
<!-- TODO: Input member names -->

## Features
- User can create grade tracker sheet for each subject with default grade components (total 100%)
- User can customize / add grade components to the sheet 
- User can input and see the grades for each grade component

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

## Terminology
- Grade components: Could be quizzes, exams, assignments, presentations
- Grade tracker sheet: A sheet which shows all grading components of a subject, along with
a grade (can be empty) and a weight (percentage)
