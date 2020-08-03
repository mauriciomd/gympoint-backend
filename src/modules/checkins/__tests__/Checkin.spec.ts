import request from 'supertest';
import { createConnection, Connection } from 'typeorm';

import app from '../../../shared/infra/http/app';

let connection: Connection;
describe('/checkins', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  beforeEach(async () => {
    await connection.query('DELETE FROM checkins');
    await connection.query('DELETE FROM enrollments');
    await connection.query('DELETE FROM students');
    await connection.query('DELETE FROM memberships');
  });

  afterAll(async () => {
    await connection.query('DROP TABLE IF EXISTS checkins');
    await connection.query('DROP TABLE IF EXISTS enrollments');
    await connection.query('DROP TABLE IF EXISTS helporders');
    await connection.query('DROP TABLE IF EXISTS students');
    await connection.query('DROP TABLE IF EXISTS memberships');
    await connection.query('DROP TABLE IF EXISTS migrations');
    await connection.query('DROP TABLE IF EXISTS users');

    await connection.close();
  });

  it('should be able to create a new check-in', async () => {
    const user = await request(app).post('/sessions').send({
      email: 'admin@gympoint.com',
      password: '123456',
    });

    const student = await request(app)
      .post('/students')
      .set('Authorization', `bearer ${user.body.token}`)
      .send({
        name: 'Student Test',
        email: 'student@test.com',
        age: 33,
        height: 190,
        weight: 110,
      });

    const response = await request(app).post(`/checkins/${student.body.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to create two check-ins at same day ', async () => {
    const user = await request(app).post('/sessions').send({
      email: 'admin@gympoint.com',
      password: '123456',
    });

    const student = await request(app)
      .post('/students')
      .set('Authorization', `bearer ${user.body.token}`)
      .send({
        name: 'Student Test',
        email: 'student@test.com',
        age: 33,
        height: 190,
        weight: 110,
      });

    await request(app).post(`/checkins/${student.body.id}`);
    const response = await request(app).post(`/checkins/${student.body.id}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('should be able to list all student check-ins', async () => {
    const user = await request(app).post('/sessions').send({
      email: 'admin@gympoint.com',
      password: '123456',
    });

    const student = await request(app)
      .post('/students')
      .set('Authorization', `bearer ${user.body.token}`)
      .send({
        name: 'Student Test',
        email: 'student@test.com',
        age: 33,
        height: 190,
        weight: 110,
      });

    await request(app).post(`/checkins/${student.body.id}`);

    const response = await request(app).get(`/checkins/${student.body.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });
});
