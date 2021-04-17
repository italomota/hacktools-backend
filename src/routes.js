const express = require('express')

const QuestionnaireController = require('./controllers/QuestionnaireController')
const AnswerController = require('./controllers/AnswerController')

const routes = express.Router()

routes.get('/questionnaires', QuestionnaireController.index)
routes.post('/questionnaires', QuestionnaireController.store)

routes.get('/questionnaires/:questionnaire_id/answers', AnswerController.index)
routes.get('/answers/:answer_id', AnswerController.show)
routes.post('/questionnaires/:questionnaire_id/answers', AnswerController.store)

module.exports = routes
