const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');
const jwt = require('jsonwebtoken');
function generateAccessToken(user) {
  // expires after half and hour (1800 seconds = 30 minutes)
  return jwt.sign({ user }, process.env.SECRET, { expiresIn: 300 });
}
module.exports = {
  async login(request, response) {
    //esse teste abaixo deve ser feito no seu banco de dados
    const username = request.body.username;
    const pwd = request.body.password;
    // if (request.body.username === 'luiz' && request.body.password === '12345') {
    //auth ok
    // const id = 1; //esse id viria do banco de dados

    const users = await connection('users').select('*');
    const user = users.find(u => u.username === username && u.password === pwd);

    if (!user) { return response.status(500).json({ message: 'Login inválido!' }); }
    return response.json({ auth: true, token: generateAccessToken(user.id) });
  },

  async logout(request, response) {
    request.user.deleteToken(req.token, (err, user) => {
      if (err)
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

  async create(request, response) {
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
      password
    });

    // return response.json({ auth: true, token: generateAccessToken(id) });
    const token = generateAccessToken({ user: id });
    response.json(token);
  },

};