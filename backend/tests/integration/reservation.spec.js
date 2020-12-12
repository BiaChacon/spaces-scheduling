const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');
describe('reservations', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    })

    it('do not allow room reservation on Sunday', async () => {
        const response = await request(app)
            .post('/register-reservation')
            .send({
                "normal": true,
                "dateStart": "2020-11-08",
                "dateEnd": "2020-11-08",
                "justification": "lalalala",
                "schedule": "1;1,2,3",
                "canceled": "false",
                "spaceId": "71b89e93"
            });

        expect(response.status).toEqual(400);
    })
    it('must do not allow creation of normal booking with different dates', async () => {
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
})
