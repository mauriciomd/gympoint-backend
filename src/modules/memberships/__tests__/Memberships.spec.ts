import request from 'supertest';
import { createConnection, Connection } from 'typeorm';

import app from '../../../shared/infra/http/app';

let connection: Connection;
describe('/memberships', () => {
  beforeAll(async () => {
    connection = await createConnection('tests');
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
});
