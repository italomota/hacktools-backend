exports.up = function(knex) {
  return knex.schema.createTable('questionnaires', function(table) {
    table.increments()
    table.string('title').notNullable()
    table.string('user').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('questionnaires')
}
