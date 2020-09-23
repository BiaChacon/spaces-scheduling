const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const SpaceController = require('./controllers/SpaceController');

const routes = express.Router();

routes.get('/spaces', SpaceController.index);

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

module.exports = routes;