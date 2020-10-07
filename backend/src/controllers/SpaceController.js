const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const spaces = await connection('spaces').select('*');
    
        return response.json(spaces);
    },

    async create(request, response) {
        const {
            name,
            description,
            localization,
            responsible,
            special,
            justification,
            disabled,
            computers,
            qtdPeople,
            extension} = request.body;
    
        const id = generateUniqueId();
        
        if(!disabled){
           await connection('spaces').insert({
            id,
            name,
            description,
            localization,
            responsible,
            special,
            justification,
            disabled,
            computers,
            qtdPeople,
            extension,
        });
        
        return response.json({ id });    
        }
        response.status(400).send('Bad request!');
         
    }    
};