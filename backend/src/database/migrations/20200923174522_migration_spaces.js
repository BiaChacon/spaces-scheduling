
exports.up = function(knex) {
  return knex.schema.createTable('spaces', function (table) {
      table.string('id').primary();   
      table.string('name').primary(); 
      table.string('description').primary(); 
      table.string('localization').primary(); 
      table.string('responsible').primary(); 
      table.boolean('special').primary(); 
      table.string('justification').primary(); 
      table.boolean('disabled').primary(); 
      table.boolean('computers').primary(); 
      table.integer('qtdPeople').primary(); 
      table.integer('extension').primary(); 
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('spaces');
};
