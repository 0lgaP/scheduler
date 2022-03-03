# Interview Scheduler
Interview Scheduler is a single-page, React application. This userfriendly app allows you to create, edit or delete interview. The information is stored in the database and persists after reload.

## Add, Edit, Delete and be sure the app is working while you wait

![Gif of scheduler functionality](https://raw.githubusercontent.com/0lgaP/scheduler/master/public/images/scheduler__.gif)
## Setup

[Clone Scheduler](https://github.com/0lgaP/scheduler) <br>
[Clone Database](https://github.com/0lgaP/scheduler-api) to a sepporate folder *outside* of Scheduler <br>
Install dependencies in both folders with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running Cypress

```sh
npm run cypress
```

## Reset Database

[RESET DATABASE](http://localhost:8001/api/debug/reset)

## Dependencies

```sh
"axios": "^0.26.0",
"classnames": "^2.2.6",
"normalize.css": "^8.0.1",
"react": "^16.9.0",
"react-dom": "^16.9.0",
"react-scripts": "3.0.0",
"react-test-render": "^1.1.2"
```