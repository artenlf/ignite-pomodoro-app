# 02-ignite-timer

## Index

- [Intro](#Intro)
- [Technologies](#Technologies)
- [Objectives](#Objectives)
- [Status](#Status)
- [Deploy](#Deploy)
- [Features](#Features)

### Intro

- This a Pomodoro style Timer application. Users can set timers, pause, and reset as it suits them.

### Technologies

- Typescript
- React
- Vite
- Styled-Components
- Phosphor-Icons
- EsLint
- React-Hook-Form
- React-Router-DOM
- Date-FNS
- Immer

### Objectives

- This project is one of the requirements of conclusion of the second module in Rocketseat's Ignite course. The goals are to practice React fundamentals and hooks such as useContext, useState, useReducer, Providers, Routes, while using styled-components package, learn even more about Immutability.

### Status

Deployed v1.0

### Deploy

![a screenshot of the app timer screen](https://github.com/artenlf/ignite-pomodoro-app/blob/main/public/screenshots/1.png)

![a screenshot of the app timer screen with a task in place](https://github.com/artenlf/ignite-pomodoro-app/blob/main/public/screenshots/2.png)

![a screenshot of the app history screen](https://github.com/artenlf/ignite-pomodoro-app/blob/main/public/screenshots/3.png)

### Features

- On the main (clock) page, users can set a name and time (minimum 1 minute) for a task and start the timer.
- On the History page, users can control their tasks by name, date of creation and status.

History and Task status rules:

- While the timer is active (couting down), a task is set to "in progress" status. 
- Whenever users stop the timer, the task status will be set to "interrupted". 
- Whenever the clock reaches zero, the task status will be set to "completed".
