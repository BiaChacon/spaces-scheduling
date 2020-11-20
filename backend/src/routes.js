const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
// const verifyJWT = require('../utils/auth');

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

routes.put('/reservation-cancel/:id', ReservationController.reservationCancel);

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


routes.post('/login', (req, res, next) => {
    //esse teste abaixo deve ser feito no seu banco de dados
    if(req.body.user === 'luiz' && req.body.password === '12345'){
      //auth ok
      const id = 1; //esse id viria do banco de dados
      const token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 300 // expires in 5min
      });
      return res.json({ auth: true, token: token });
    }
    
    res.status(500).json({message: 'Login inválido!'});
})

module.exports = routes;