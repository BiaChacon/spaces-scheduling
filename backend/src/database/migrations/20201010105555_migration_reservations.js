
exports.up = function(knex) {
  return knex.schema.createTable('reservations', function (table) {
      table.string('id').primary();
      table.boolean('normal');
      table.date('dateStart');
      table.date('dateEnd');
      table.string('justification');
      table.string('schedule');
      table.boolean('canceled');
      table.string('spaceId').references('id').inTable('spaces');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('reservations');
};
