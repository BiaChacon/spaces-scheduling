const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');
const jwt = require('jsonwebtoken');
function generateAccessToken(user) {
  // expires after half and hour (600 seconds = 10 minutes)
  return jwt.sign({ user }, process.env.SECRET, { expiresIn: 600 });
}
module.exports = {
  async login(request, response) {
    const username = request.body.username;
    const pwd = request.body.password;
    const users = await connection('users').select('*');
    const user = users.find(u => u.username === username && u.password === pwd);

    if (!user) { return response.status(500).json({ auth: false, message: 'Login inválido!' }); }
    return response.json({ auth: true, token: generateAccessToken(user.id), user: {id: user.id, username: user.username} });
  },

  logout(request, response) {

    response.json({ auth: false, token: null });
  },

  async profile(request, response) {
    const { id } = request.params;
    const user = await connection('users').select('*').where('id', id);

    return response.json({
      id: user.id,
      username: user.username,
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
      password
    } = request.body;

    const id = generateUniqueId();
    await connection('users').insert({
      id,
      admin,
      username,
      password
    });

    return response.json( {id});
  },

};