import request from 'supertest';
import { createConnection, Connection } from 'typeorm';

import app from '../../../shared/infra/http/app';

let connection: Connection;
describe('/memberships', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  beforeEach(async () => {
    await connection.query('DELETE FROM students');
  });

  afterAll(async () => {
    await connection.query('DROP TABLE IF EXISTS memberships');
    await connection.query('DROP TABLE IF EXISTS users');
    await connection.query('DROP TABLE IF EXISTS migrations');
    await connection.query('DROP TABLE IF EXISTS students');

    await connection.close();
  });

  it('should not be able to create a new membership without a valid auth token', async () => {
    const response = await request(app).post('/students').send({
      name: 'Student Test',
      email: 'student@test.com',
      age: 33,
      height: 190,
      weight: 110,
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
  });

  it('should not be able to create a new membership without a name', async () => {
    const user = await request(app).post('/sessions').send({
      email: 'admin@gympoint.com',
      password: '123456',
    });

    const response = await request(app)
      .post('/students')
      .set('Authorization', `bearer ${user.body.token}`)
      .send({
        email: 'student@test.com',
        age: 33,
        height: 190,
        weight: 110,
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('should not be able to create a new student without an email', async () => {
    const user = await request(app).post('/sessions').send({
      email: 'admin@gympoint.com',
      password: '123456',
    });

    const response = await request(app)
      .post('/students')
      .set('Authorization', `bearer ${user.body.token}`)
      .send({
        name: 'Student Test',
        age: 33,
        height: 190,
        weight: 110,
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('should not be able to create a new student without an age', async () => {
    const user = await request(app).post('/sessions').send({
      email: 'admin@gympoint.com',
      password: '123456',
    });

    const response = await request(app)
      .post('/students')
      .set('Authorization', `bearer ${user.body.token}`)
      .send({
        name: 'Student Test',
        email: 'student@test.com',
        height: 190,
        weight: 110,
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('should not be able to create a new student without an height', async () => {
    const user = await request(app).post('/sessions').send({
      email: 'admin@gympoint.com',
      password: '123456',
    });

    const response = await request(app)
      .post('/students')
      .set('Authorization', `bearer ${user.body.token}`)
      .send({
        name: 'Student Test',
        email: 'student@test.com',
        age: 33,
        weight: 110,
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('should not be able to create a new student without an weight', async () => {
    const user = await request(app).post('/sessions').send({
      email: 'admin@gympoint.com',
      password: '123456',
    });

    const response = await request(app)
      .post('/students')
      .set('Authorization', `bearer ${user.body.token}`)
      .send({
        name: 'Student Test',
        email: 'student@test.com',
        age: 33,
        height: 190,
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('should be able to create a new student', async () => {
    const user = await request(app).post('/sessions').send({
      email: 'admin@gympoint.com',
      password: '123456',
    });

    const response = await request(app)
      .post('/students')
      .set('Authorization', `bearer ${user.body.token}`)
      .send({
        name: 'Student Test',
        email: 'student@test.com',
        age: 33,
        height: 190,
        weight: 110,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('age');
    expect(response.body).toHaveProperty('height');
    expect(response.body).toHaveProperty('weight');
  });
});
