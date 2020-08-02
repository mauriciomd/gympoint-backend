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
  - ```GET     /students/show?email=``` : allow to show a specific student by email.

  - ```POST    /enrollments``` : allow to create a new enrollment.
  - ```GET     /students``` : allow to list all the enrollments.
  - ```DELETE  /students/:studentId``` : allow to delete a specific enrollment.

- Students routes (it does not require authentication):
  - ```POST    /checkins/:studentId```: allow to create a new check-in.
  - ```GET     /checkins/:studentId```: allow to list all the student check-ins.

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