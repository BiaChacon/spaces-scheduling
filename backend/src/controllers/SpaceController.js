const generateUniqueId = require("../utils/generateUniqueId");
const connection = require("../database/connection");
const availabilityCheck = require("../utils/availabilityCheck");
module.exports = {
  async index(request, response) {
    const spaces = await connection("spaces").select("*");

    return response.json(spaces);
  },

  async show(request, response) {
    const { id } = request.params;
    const space = await connection("spaces").select("*").where("id", id);
    return response.json(space);
  },

  async availability(request, response) {
    const { computers, date, hours } = request.query;

    let dayWeek = new Date(date);
    let schedule = `${dayWeek.getDay()};${hours}`;
    console.log(schedule);

    var spacesAvailability = [];
    const spaces = await connection("spaces")
      .select("*")
      .where("computers", computers);
    var reservations = [];

    for (let i = 0; i < spaces.length; i++) {
      reservations = await connection("reservations")
        .select("*")
        .where({ spaceId: spaces[i].id, canceled: 0 });
      if (availabilityCheck(true, date, date, schedule, reservations)) {
        spacesAvailability.push(spaces[i]);
      }
    }

    return response.json(spacesAvailability);
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
      extension,
    } = request.body;

    const id = generateUniqueId();

    if (!disabled) {
      await connection("spaces").insert({
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
    response.status(400).send("Bad request!");
  },

  async edit(request, response) {
    const { id } = request.params;
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
        extension,
      } = request.body;

    const space = await connection("spaces")
      .select("id")
      .where("id", id)
      .then(([row]) => {
        if (!row) {
          return response.status(400).send("do not exist");
        }
        return connection("spaces")
          .update({
            'name': name,
            'description': description,
            'localization': localization,
            'responsible': responsible,
            'special': special,
            'justification': justification,
            'disabled': disabled,
            'computers': computers,
            'qtdPeople': qtdPeople,
            'extension': extension,
          })
          .where("id", row.id);
      });
    return response.status(200).send("Space edited.");
  },
};
