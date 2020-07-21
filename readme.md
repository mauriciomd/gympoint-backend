## Gympoint Backend

### About
This is the backend app which is used to manage a gym, where an admin can sign up students, manage enrollments, and the memberships.

### Techs:

- Typescript
- TDD
- DDD
- TypeORM (PostgreSQL)
- Express JS

### App endpoints:

- 

### Tests Suite:

-

### How to build:
  - Requeriments:
    - NodeJs.

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