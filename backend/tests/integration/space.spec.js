const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Spaces', () => {
  beforeEach(async () => {
      await connection.migrate.rollback();
      await connection.migrate.latest();
  });

  afterAll(async () => {
      await connection.destroy();
  })

  it('should be able to create a new Space', async () => {
      const response = await request(app)
         .post('/spaces')
         .send({
            name: "Lab 1",
            description: "pipipi popopo",
            localization: "predio informatica",
            responsible: "Luiz",
            special: "false",
            justification: "lalalala",
            disabled: "false",
            computers: "true",
            qtdPeople: "40",
            extension: "123" 
      });

      expect(response.body).toHaveProperty('id');
      expect(response.body.id).toHaveLength(8);
  });
});