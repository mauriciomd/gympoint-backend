import request from 'supertest';
import { createConnection, Connection } from 'typeorm';

import app from '../../../shared/infra/http/app';

let connection: Connection;
describe('/enrollments', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  beforeEach(async () => {
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

  it('should not be able to create a new enrollment without a valid auth token', async () => {
    const response = await request(app).post('/enrollments').send({
      membershipId: 'valid-membership-id',
      studentId: 'valid-student-id',
      startDate: new Date(),
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
  });

  it('should not be able to create a new enrollment enrollment a membershipId', async () => {
    const user = await request(app).post('/sessions').send({
      email: 'admin@gympoint.com',
      password: '123456',
    });

    const response = await request(app)
      .post('/enrollments')
      .set('Authorization', `bearer ${user.body.token}`)
      .send({
        studentId: 'valid-student-id',
        startDate: new Date(),
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('should not be able to create a new enrollment without a studentId', async () => {
    const user = await request(app).post('/sessions').send({
      email: 'admin@gympoint.com',
      password: '123456',
    });

    const response = await request(app)
      .post('/enrollments')
      .set('Authorization', `bearer ${user.body.token}`)
      .send({
        membershipId: 'valid-membership-id',
        startDate: new Date(),
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('should not be able to create a new enrollment without a start date', async () => {
    const user = await request(app).post('/sessions').send({
      email: 'admin@gympoint.com',
      password: '123456',
    });

    const response = await request(app)
      .post('/enrollments')
      .set('Authorization', `bearer ${user.body.token}`)
      .send({
        membershipId: 'valid-membership-id',
        studentId: 'valid-student-id',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('should be able to create a new enrollment', async () => {
    const user = await request(app).post('/sessions').send({
      email: 'admin@gympoint.com',
      password: '123456',
    });

    const membership = await request(app)
      .post('/memberships')
      .set('Authorization', `bearer ${user.body.token}`)
      .send({
        title: 'valid title',
        price: 59,
        duration: 12,
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

    const response = await request(app)
      .post('/enrollments')
      .set('Authorization', `bearer ${user.body.token}`)
      .send({
        membershipId: membership.body.id,
        studentId: student.body.id,
        startDate: new Date(),
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('total');
    expect(response.body).toHaveProperty('endDate');
  });

  it('should be able to list all the enrollments', async () => {
    const user = await request(app).post('/sessions').send({
      email: 'admin@gympoint.com',
      password: '123456',
    });

    const membership = await request(app)
      .post('/memberships')
      .set('Authorization', `bearer ${user.body.token}`)
      .send({
        title: 'valid title',
        price: 59,
        duration: 12,
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

    await request(app)
      .post('/enrollments')
      .set('Authorization', `bearer ${user.body.token}`)
      .send({
        membershipId: membership.body.id,
        studentId: student.body.id,
        startDate: new Date(),
      });

    const response = await request(app)
      .get('/enrollments')
      .set('Authorization', `bearer ${user.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].isActive).toBe(true);
  });

  it('should be able to delete all the enrollments', async () => {
    const user = await request(app).post('/sessions').send({
      email: 'admin@gympoint.com',
      password: '123456',
    });

    const membership = await request(app)
      .post('/memberships')
      .set('Authorization', `bearer ${user.body.token}`)
      .send({
        title: 'valid title',
        price: 59,
        duration: 12,
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

    const enrollment = await request(app)
      .post('/enrollments')
      .set('Authorization', `bearer ${user.body.token}`)
      .send({
        membershipId: membership.body.id,
        studentId: student.body.id,
        startDate: new Date(),
      });

    const enrollmentList = await request(app)
      .get('/enrollments')
      .set('Authorization', `bearer ${user.body.token}`);

    expect(enrollmentList.status).toBe(200);
    expect(enrollmentList.body).toHaveLength(1);

    const deleteResponse = await request(app)
      .delete(`/enrollments/${enrollment.body.id}`)
      .set('Authorization', `bearer ${user.body.token}`);

    const afterRemovingEnrollmentList = await request(app)
      .get('/enrollments')
      .set('Authorization', `bearer ${user.body.token}`);

    expect(deleteResponse.status).toBe(200);
    expect(afterRemovingEnrollmentList.status).toBe(200);
    expect(afterRemovingEnrollmentList.body).toHaveLength(0);
  });
});
