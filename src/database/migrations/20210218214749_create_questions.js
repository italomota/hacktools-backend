exports.up = function(knex) {
  return knex.schema.createTable('questions', function(table) {
    table.increments()
    table.string('description').notNullable()
    table.integer('questionnaire_id').notNullable()

    table.foreign('questionnaire_id').references('id').inTable('questionnaires')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('questions')
}
