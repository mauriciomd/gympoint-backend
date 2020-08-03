## Gympoint Backend

### About

This is the backend app which is used to manage a gym, where an admin can sign up students, manage enrollments, and the memberships.

### Techs and libraries:

- Typescript
- TypeORM (PostgreSQL)
- Jest and Supertest (TDD)
- ExpressJS
- BCryptJS
- JsonWebToken (JWT)
- TSyringe (dependency injection)
- date-fns

### App endpoints:

- An Insomnia example file with all routes could be found [here](./.github/Insomnio.json)

- ```POST /sessions``` : allow admins to authenticate in the app.

- When authenticated - admin routes: 
  - ```POST    /memberships``` : allow to create a new membership option.
  - ```GET     /memberships``` : allow to list all the membership option.
  - ```GET     /memberships/:membershipId``` : allow to show a specific membership option.
  - ```DELETE  /memberships/:membershipId``` : allow to delete a specific membership option.

  - ```POST    /students``` : allow to create a new student.
  - ```GET     /students``` : allow to list all the students.
  - ```PUT     /students/:studentId``` : allow to update a specific student.
  - ```DELETE  /students/:studentId``` : allow to delete a specific membership.

  - ```POST    /enrollments``` : allow to create a new enrollment.
  - ```GET     /students``` : allow to list all the enrollments.
  - ```DELETE  /students/:studentId``` : allow to delete a specific enrollment.

  - ```GET     /help-orders/```: allow to get all unanswered help orders.
  - ```POST    /help-orders/:orderId/answer```: allow to answer a help order.


- Students routes (it does not require authentication):
  - ```GET     /students/show?email=``` : allow to retrive a specific student by email.

  - ```POST    /checkins/:studentId```: allow to create a new check-in.
  - ```GET     /checkins/:studentId```: allow to list all the student check-ins.

  - ```POST    /help-orders/:studentId```: allow to create a new help order.
  - ```GET     /help-orders/:studentId```: allow to list all the help orders of a specific student.


### Tests Suite

All the current tests are stored in the ```__tests__``` folder inside each module.

- module: user
  - CreateSessionService - Unit tests
  - CreateSession: Integration Test

- mdoule: membership
  - CreateMembershipService - Unit tests
  - ListMembershipService - Unit tests
  - ShowMembershipService - Unit tests
  - DeleteMembershipService - Unit tests
  - Memberships - Integration tests

- mdoule: enrollments
  - CreateEnrollmentService - Unit tests
  - ListEnrollmentService - Unit tests
  - DeleteEnrollmentService - Unit tests
  - Enrollments - Integration tests

- module: checkins
  - ListCheckinService - Unit tests
  - DeleteCheckinService - Unit tests
  - Checkins - Integration tests

- module: helpOrder
  - ListUnansweredQuestionService - Unit tests
  - ListStudentQuestionService - Unit tests
  - CreateQuestionService - Unit tests
  - CreateAnswerService - Unit tests
  - HelpOrders - Integration tests

### How to build:

- Requeriments:
  - NodeJs.
  - PostgreSQL

- First of all, ensure that you have postgres running with a database called "gympoint".

- Clone this repository:

```
  cd gympoint-backend
  
  // using yarn
  yarn
  yarn typeorm migration:run
  yarn dev:server

  // using npm
  npm install
  npm run typeorm migration:run
  npm run dev:server 
```

- Default user:
  - email: admin@gympoint.com
  - password: 123456

### Running tests:

- First of all, ensure that you have postgres running with a database called "gympoint_tests".

- Edit the database property inside ormconfig.json.
```json 
  "database": "gympoint_tests"
``` 

- Run the tests

```
  // using yarn
  yarn test

  // using npm
  npm run test
```