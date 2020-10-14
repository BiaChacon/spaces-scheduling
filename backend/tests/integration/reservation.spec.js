const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
});

afterAll(async () => {
    await connection.destroy();
})