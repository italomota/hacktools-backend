const express = require('express')

const QuestionnaireController = require('./controllers/QuestionnaireController')

const routes = express.Router()

routes.get('/questionnaires', QuestionnaireController.index)
routes.post('/questionnaires', QuestionnaireController.store)

module.exports = routes
