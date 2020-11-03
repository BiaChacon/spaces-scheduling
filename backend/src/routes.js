const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const SpaceController = require('./controllers/SpaceController');
const ReservationController = require('./controllers/ReservationController');

const routes = express.Router();

routes.get('/spaces', SpaceController.index);
routes.get('/spaces/:id', SpaceController.show);
routes.get('/check-availability', SpaceController.availability);

routes.post('/spaces', celebrate({
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

routes.get('/reservations', ReservationController.index);
routes.get('/reservations/:id', ReservationController.show);
routes.get('/space-reservations', ReservationController.reservationsBySpace);

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