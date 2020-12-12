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

  it('should not be able to create a new space', async () => {
    const response = await request(app)
       .post('/spaces')
       .send({
          name: "Lab 2",
          description: "pipipi popopo",
          localization: "predio informatica",
          responsible: "Luiz",
          special: "false",
          justification: "lalalala",
          disabled: "false",
          computers: "true",
          qtdPeople: "30",
          extension: "shjfdhsfjkhjk" 
    });

    expect(response.status).toEqual(400);
    });

    it('vazio', async () => {
        const response = await request(app)
           .post('/spaces')
           .send({});
    
        expect(response.status).toEqual(400);
    });

    it('disabled', async () => {
        const response = await request(app)
           .post('/spaces')
           .send({
              name: "Lab 2",
              description: "pipipi popopo",
              localization: "predio informatica",
              responsible: "Luiz",
              special: "false",
              justification: "lalalala",
              disabled: "true",
              computers: "true",
              qtdPeople: "30",
              extension: "123" 
        });
        expect(response.status).toEqual(400);
    });

    it('qtdPeople', async () => {
        const response = await request(app)
           .post('/spaces')
           .send({
              name: "Lab 2",
              description: "pipipi popopo",
              localization: "predio informatica",
              responsible: "Luiz",
              special: "false",
              justification: "lalalala",
              disabled: "false",
              computers: "true",
              qtdPeople: "lalalalal",
              extension: "123" 
        });
    
        expect(response.status).toEqual(400);
        });

        it('name', async () => {
            const response = await request(app)
               .post('/spaces')
               .send({
                  name: "",
                  description: "pipipi popopo",
                  localization: "predio informatica",
                  responsible: "Luiz",
                  special: "false",
                  justification: "lalalala",
                  disabled: "false",
                  computers: "true",
                  qtdPeople: "20",
                  extension: "123" 
            });
        
            expect(response.status).toEqual(400);
        });

        it('localization', async () => {
            const response = await request(app)
               .post('/spaces')
               .send({
                  name: "Lab 3",
                  description: "pipipi popopo",
                  localization: "predio informatica",
                  responsible: "",
                  special: "false",
                  justification: "lalalala",
                  disabled: "false",
                  computers: "true",
                  qtdPeople: "20",
                  extension: "123" 
            });
        
            expect(response.status).toEqual(400);
        });
        
        it('responsible', async () => {
            const response = await request(app)
               .post('/spaces')
               .send({
                  name: "Lab 3",
                  description: "pipipi popopo",
                  localization: "",
                  responsible: "Luiz",
                  special: "false",
                  justification: "lalalala",
                  disabled: "false",
                  computers: "true",
                  qtdPeople: "20",
                  extension: "123" 
            });
        
            expect(response.status).toEqual(400);
        });

});