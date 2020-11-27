const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');
const jwt = require('jsonwebtoken');

module.exports = {
  login(request, response){
    //esse teste abaixo deve ser feito no seu banco de dados
    if(request.body.username === 'luiz' && request.body.password === '12345'){
      //auth ok
      const id = 1; //esse id viria do banco de dados
      const token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 300 // expires in 5min
      });
      return response.json({ auth: true, token: token });
    }

    return response.status(500).json({message: 'Login inválido!'});
  },

  async logout(request, response){
    request.user.deleteToken(req.token,(err,user)=>{
      if(err)
        return res.status(400).send(err);

      return response.sendStatus(200);
    });
  },

  async profile(request, response) {
    return response.json({
      isAuth: true,
      id: request.user.id,
      username: request.user.username,
    });
  },

  async index(request, response) {
    const users = await connection('users').select('*');

    return response.json(users);
  },

  async create(request, response){
    const {
      admin,
      username,
      password,
      password2,
    } = request.body;

    const id = generateUniqueId();

    await connection('users').insert({
      id,
      admin,
      username,
      password,
      password2,
      token
    });
    return response.json({ id });
  },

};