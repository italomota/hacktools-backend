exports.up = function(knex) {
  return knex.schema.createTable('answers_details', function(table) {
    table.integer('answer_id').notNullable()
    table.integer('question_id').notNullable()
    table.string('description').notNullable()

    table.primary(['answer_id', 'question_id'])
    table.foreign('answer_id').references('id').inTable('answers')
    table.foreign('question_id').references('id').inTable('questions')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('answers_details')
}
