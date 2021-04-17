const connection = require('../database/connection')

module.exports = {
  async index (request, response) {
    const questionnaires = await connection('questionnaires').select(
      'id',
      'title'
    )

    return response.json(questionnaires)
  },
  async show (request, response) {
    const { questionnaire_id } = request.params

    const questions = await connection('questions')
      .where('questionnaire_id', questionnaire_id)
      .select(
        'id',
        'description'
      )

    return response.json(questions)
  },
  async store (request, response) {
    const { user } = request.headers
    const { title, questions } = request.body

    if (!user) {
      return response.status(400).json({ message: 'User not found!' })
    }

    const trx = await connection.transaction()

    try {
      const insertedIds = await trx('questionnaires').insert({
        title,
        user
      })

      const questionnaireId = insertedIds[0]

      const questionsWithId = questions.map(question => ({
        description: question,
        questionnaire_id: questionnaireId
      }))

      await trx('questions').insert(questionsWithId)

      await trx.commit()

      return response.status(201).json()
    } catch (error) {
      await trx.rollback()

      return response.status(500).json()
    }
  }
}
