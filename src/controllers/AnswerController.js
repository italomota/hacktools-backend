const connection = require('../database/connection')

module.exports = {
  async index (request, response) {
    const { questionnaire_id } = request.query

    if (!questionnaire_id) {
      const answers = await connection('answers').select('id')

      return response.json(answers)
    }

    const answers = await connection('answers')
      .where('questionnaire_id', Number(questionnaire_id))
      .select('id')

    return response.json(answers)
  },
  async show (request, response) {
    const { answer_id } = request.params

    const answerDetails = await connection('answers_details')
      .join('questions', 'questions.id', '=', 'answers_details.question_id')
      .where('answer_id', answer_id)
      .select(
        'questions.description as question',
        'answers_details.description as answer',
      )

    return response.json(answerDetails)
  },
  async store (request, response) {
    const { questionnaire_id } = request.params
    const { latitude, longitude, answer_details } = request.body

    const trx = await connection.transaction()

    try {
      const insertedIds = await trx('answers').insert({
        latitude,
        longitude,
        questionnaire_id
      })

      const answerId = insertedIds[0]

      const answerDetailsWithId = answer_details.map(({ question_id, description }) => ({
        answer_id: answerId,
        question_id,
        description
      }))

      await trx('answers_details').insert(answerDetailsWithId)

      await trx.commit()

      return response.status(201).json()
    } catch (error) {
      await trx.rollback()

      return response.status(500).json()
    }
  }
}
