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

it('must not allow the creation of a normal reservation with different start and end dates', async () => {
    const response = await request(app)
       .post('/register-reservation')
       .send({
            "normal": true,
            "dateStart": "2020-12-21",
            "dateEnd": "2020-12-22",
            "justification": "eu quero a sala dia 12",
            "schedule": "ninguem",
            "canceled": false,
            "spaceId": "5d35a16f"  
        });

    expect(response.status).toEqual(400);
});

it('must not allow the creation of a non normal reservation with equal start and end dates', async () => {
    const response = await request(app)
       .post('/register-reservation')
       .send({
            "normal": false,
            "dateStart": "2020-12-01",
            "dateEnd": "2020-12-01",
            "justification": "eu quero a sala dia 12",
            "schedule": "ninguem",
            "canceled": false,
            "spaceId": "5d35a16f"  
        });

    expect(response.status).toEqual(400);
});