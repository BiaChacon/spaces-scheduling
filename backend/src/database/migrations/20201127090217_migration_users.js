
exports.up = function(knex) {
  return knex.schema.createTable('users', function (table) {
      table.string('id').primary();
      table.boolean('admin');
      table.string('username');
      table.string('password');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
