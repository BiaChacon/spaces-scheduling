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

    //validate space
    const space = await connection('spaces').select('*').where('id', spaceId);
    if(space.length==0)
      return response.status(400).send('Bad request! Space does not exist!');
    
    if(!normal){
      var data1 = new Date(dateStart);
      var data2 = new Date(dateEnd);
      if(data1>=data2)
        return response.status(400).send('Bad request! The end date of the recurring reservation must be after the start date!');
    }else{
      var data1 = new Date(dateStart);
      var data2 = new Date(dateEnd);
      if(data1!==data2)
        return response.status(400).send('Bad request! The end date of the recurring reservation must be after the start date!');
    }
    //get reservations for a space
    const reservations = await connection('reservations').select('*').where('spaceId', spaceId);
    //check if the date and time are available for a given space
    const available=availabilityCheck(normal,dateStart,dateEnd,schedule,reservations);
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