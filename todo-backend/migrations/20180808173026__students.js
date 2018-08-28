
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('todos', function(table) {
      // table.increments('id').primary()
      table.string('task').notNullable()
      table.boolean('done').notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('todos')
};
