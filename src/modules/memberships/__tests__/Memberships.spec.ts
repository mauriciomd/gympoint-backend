import request from 'supertest';
import { createConnection, Connection } from 'typeorm';

import app from '../../../shared/infra/http/app';

let connection: Connection;
describe('/memberships', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.query('DROP TABLE IF EXISTS users');
    await connection.query('DROP TABLE IF EXISTS memberships');
    await connection.query('DROP TABLE IF EXISTS migrations');

    await connection.close();
  });

  it('should not be able to create a new membership without a valid auth token', async () => {
    const response = await request(app).post('/memberships').send({
      tile: 'Valid tile',
      price: 100,
      duration: 12,
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
  });

  it('should not be able to create a new membership without a title', async () => {
    const user = await request(app).post('/sessions').send({
      email: 'admin@gympoint.com',
      password: '123456',
    });

    const response = await request(app)
      .post('/memberships')
      .set('Authorization', `bearer ${user.body.token}`)
      .send({
        price: 100,
        duration: 12,
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('should not be able to create a new membership without a price', async () => {
    const user = await request(app).post('/sessions').send({
      email: 'admin@gympoint.com',
      password: '123456',
    });

    const response = await request(app)
      .post('/memberships')
      .set('Authorization', `bearer ${user.body.token}`)
      .send({
        title: 'valid title',
        duration: 12,
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('should not be able to create a new membership without a duration', async () => {
    const user = await request(app).post('/sessions').send({
      email: 'admin@gympoint.com',
      password: '123456',
    });

    const response = await request(app)
      .post('/memberships')
      .set('Authorization', `bearer ${user.body.token}`)
      .send({
        title: 'valid title',
        price: 12,
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('should be able to create a new membership', async () => {
    const user = await request(app).post('/sessions').send({
      email: 'admin@gympoint.com',
      password: '123456',
    });

    const response = await request(app)
      .post('/memberships')
      .set('Authorization', `bearer ${user.body.token}`)
      .send({
        title: 'valid title',
        price: 59,
        duration: 12,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('title');
    expect(response.body).toHaveProperty('price');
    expect(response.body).toHaveProperty('duration');
  });
});
