const generateUniqueId = require('../utils/generateUniqueId');
const availabilityCheck = require('../utils/availabilityCheck');
const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const reservations = await connection('reservations').select('*');

    return response.json(reservations);
  },
  async create(request, response) {
    const {
      normal,
      dateStart,
      dateEnd,
      justification,
      schedule,
      canceled,
      spaceId
    } = request.body;

    const id = generateUniqueId();
    
    const available = availabilityCheck(normal,dateStart,dateEnd,schedule);

    if(available){
      await connection('reservations').insert({
        id, 
        normal,
        dateStart,
        dateEnd,
        justification,
        schedule,
        canceled,
        spaceId
      });
    
      return response.json({ 
        id, 
        normal,
        dateStart,
        dateEnd,
        justification,
        schedule,
        canceled,
        spaceId 
      });
    }
    return response.status(400).send('Bad request!');
  },

};