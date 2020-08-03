import request from 'supertest';
import { createConnection, Connection } from 'typeorm';

import app from '../../../shared/infra/http/app';

let connection: Connection;
describe('/help-orders', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  beforeEach(async () => {
    await connection.query('DELETE FROM students');
    await connection.query('DELETE FROM helporders');
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

  it('should not be able to create a new help order without a question', async () => {
    const user = await request(app).post('/sessions').send({
      email: 'admin@gympoint.com',
      password: '123456',
    });
    const student = await request(app)
      .post('/students')
      .set('Authorization', `bearer ${user.body.token}`)
      .send({
        name: 'Valid Student',
        email: 'valid@student-email.com',
        age: 33,
        height: 190,
        weight: 110,
      });
    const response = await request(app).post(`/help-orders/${student.body.id}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('should be able to create a new help order', async () => {
    const user = await request(app).post('/sessions').send({
      email: 'admin@gympoint.com',
      password: '123456',
    });
    const student = await request(app)
      .post('/students')
      .set('Authorization', `bearer ${user.body.token}`)
      .send({
        name: 'Valid Student',
        email: 'valid@student-email.com',
        age: 33,
        height: 190,
        weight: 110,
      });
    const response = await request(app)
      .post(`/help-orders/${student.body.id}`)
      .send({
        question: 'A valid question',
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('question');
  });

  it('should be able to list all the unanswered help orders', async () => {
    const user = await request(app).post('/sessions').send({
      email: 'admin@gympoint.com',
      password: '123456',
    });

    const student = await request(app)
      .post('/students')
      .set('Authorization', `bearer ${user.body.token}`)
      .send({
        name: 'Valid Student',
        email: 'valid@student-email.com',
        age: 33,
        height: 190,
        weight: 110,
      });

    await request(app).post(`/help-orders/${student.body.id}`).send({
      question: 'A valid question',
    });

    const response = await request(app)
      .get('/help-orders')
      .set('Authorization', `bearer ${user.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it('should be able to list all the help orders of a specific student', async () => {
    const user = await request(app).post('/sessions').send({
      email: 'admin@gympoint.com',
      password: '123456',
    });

    const student = await request(app)
      .post('/students')
      .set('Authorization', `bearer ${user.body.token}`)
      .send({
        name: 'Valid Student',
        email: 'valid@student-email.com',
        age: 33,
        height: 190,
        weight: 110,
      });

    await request(app).post(`/help-orders/${student.body.id}`).send({
      question: 'A valid question',
    });

    const response = await request(app).get(`/help-orders/${student.body.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it('should be able to answer a help order', async () => {
    const user = await request(app).post('/sessions').send({
      email: 'admin@gympoint.com',
      password: '123456',
    });

    const student = await request(app)
      .post('/students')
      .set('Authorization', `bearer ${user.body.token}`)
      .send({
        name: 'Valid Student',
        email: 'valid@student-email.com',
        age: 33,
        height: 190,
        weight: 110,
      });

    const order = await request(app)
      .post(`/help-orders/${student.body.id}`)
      .send({
        question: 'A valid question',
      });

    const response = await request(app)
      .post(`/help-orders/${order.body.id}/answer`)
      .set('Authorization', `bearer ${user.body.token}`)
      .send({
        answer: 'a valid answer',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('answer');
    expect(response.body).toHaveProperty('answeredAt');
    expect(response.body.answer).toEqual('a valid answer');
  });

  it('should not be able to answer a help order without an auth token', async () => {
    const user = await request(app).post('/sessions').send({
      email: 'admin@gympoint.com',
      password: '123456',
    });

    const student = await request(app)
      .post('/students')
      .set('Authorization', `bearer ${user.body.token}`)
      .send({
        name: 'Valid Student',
        email: 'valid@student-email.com',
        age: 33,
        height: 190,
        weight: 110,
      });

    const order = await request(app)
      .post(`/help-orders/${student.body.id}`)
      .send({
        question: 'A valid question',
      });

    const response = await request(app)
      .post(`/help-orders/${order.body.id}/answer`)
      .send({
        answer: 'a valid answer',
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
  });
});
