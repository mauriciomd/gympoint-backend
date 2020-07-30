import request from 'supertest';
import { createConnection, Connection } from 'typeorm';

import app from '../../../shared/infra/http/app';

let connection: Connection;
describe('/sessions', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.query('DROP TABLE IF EXISTS enrollments');
    await connection.query('DROP TABLE IF EXISTS memberships');
    await connection.query('DROP TABLE IF EXISTS students');
    await connection.query('DROP TABLE IF EXISTS users');
    await connection.query('DROP TABLE IF EXISTS migrations');

    await connection.close();
  });

  it('should be able to create a new session', async () => {
    const response = await request(app).post('/sessions').send({
      email: 'admin@gympoint.com',
      password: '123456',
    });

    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('user');
  });

  it('should not be able to create a new session without email', async () => {
    const response = await request(app).post('/sessions').send({
      password: '123456',
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('should not be able to create a new session without password', async () => {
    const response = await request(app).post('/sessions').send({
      email: 'admin@gympoint.com',
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });
});
