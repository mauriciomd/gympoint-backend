## Gympoint Backend

### About
This is the backend app which is used to manage a gym, where an admin can sign up students, manage enrollments, and the memberships.

### Techs and libraries:

- Typescript
- TypeORM (PostgreSQL)
- Jest and Supertest (TDD)
- ExpressJS
- BCryptJS
- JsonWebToken
- TSyringe (dependency injection)

### App endpoints:

- ```POST /sessions``` : allow admins to authenticate in the app.

- When authenticated: 
  - ```POST    /memberships``` : allow to create a new membership option.
  - ```GET     /memberships``` : allow to list all the membership option.
  - ```GET     /memberships/:membershipId``` : allow to show a specific membership option.
  - ```DELETE  /memberships/:membershipId``` : allow to delete a specific membership option.

### Tests Suite

All the current tests are stored in the ```__tests__``` folder inside each module.

- module: user
  - CreateSessionService - Unit tests
  - CreateSession: Integration Test

- mdoule:
  - CreateMembershipService - Unit tests
  - ListMembershipService - Unit tests
  - Memberships - Integration tests

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

````
  // using yarn
  yarn test

  // using npm
  npm run test
```