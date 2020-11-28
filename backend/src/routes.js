const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
require("dotenv-safe").config();
const verifyJWT = require('./utils/auth');

const SpaceController = require('./controllers/SpaceController');
const ReservationController = require('./controllers/ReservationController');
const UserController = require('./controllers/UserController');

const routes = express.Router();

routes.post('/login', UserController.login);
routes.post('/register-user', verifyJWT, UserController.create);
routes.post('/logout', verifyJWT, UserController.logout);
routes.get('/profile', verifyJWT, UserController.profile);

routes.get('/spaces', verifyJWT, SpaceController.index);
routes.get('/spaces/:id', verifyJWT, SpaceController.show);
routes.get('/check-availability', verifyJWT, SpaceController.availability);

routes.post('/spaces', verifyJWT, celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        localization: Joi.string().required(),
        responsible: Joi.string().required(),
        special: Joi.boolean().required(),
        justification: Joi.string().required(),
        disabled: Joi.boolean().required(),
        computers: Joi.boolean().required(),
        qtdPeople: Joi.number().required(),
        extension: Joi.number().required() //ramal
    })
}), SpaceController.create);

routes.get('/reservations', verifyJWT, ReservationController.index);
routes.get('/reservations/:id', verifyJWT, ReservationController.show);
routes.get('/space-reservations', verifyJWT, ReservationController.reservationsBySpace);

routes.put('/reservation-cancel/:id', verifyJWT, ReservationController.reservationCancel);

routes.post('/register-reservation', celebrate({
    [Segments.BODY]: Joi.object().keys({
        normal: Joi.boolean().required(),
        dateStart: Joi.string().required(),
        dateEnd: Joi.string().required(),
        justification: Joi.string().required(),
        schedule: Joi.string().required(),
        canceled: Joi.boolean().required(),
        spaceId: Joi.string().required()
    })
}), ReservationController.create);

module.exports = routes;