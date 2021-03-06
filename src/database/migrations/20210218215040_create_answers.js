exports.up = function(knex) {
  return knex.schema.createTable('answers', function(table) {
    table.increments()
    table.integer('questionnaire_id').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())

    table.foreign('questionnaire_id').references('id').inTable('questionnaires')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('answers')
}
