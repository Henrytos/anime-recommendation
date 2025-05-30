const quizModel = require("../models/quiz.model.js")
const view = require("../models/view.model.js");

async function getQuizWithQuestionsController(request, response) {
  const quizId = request.params.quizId;

  const quiz = await quizModel.findById(quizId)
  const quizNotFound = quiz.length == 0

  if (quizNotFound) {
    return response.status(400).json({
      message: "invalid quiz id",
    });
  }

  const quizWithQuestionsAlternative = await view.getQuizWithQuestionsAlternative(quizId)


  const questionsWithAlternatives = []

  let quizzesIds = []
  let quizzesTitles = []

  for (let row = 0; row < quizWithQuestionsAlternative.length; row++) {
    let result = quizWithQuestionsAlternative[row]

    if (!quizzesIds.includes(result.question_id)) {
      quizzesIds.push(result.question_id)
      quizzesTitles.push(result.question_title)
    }
  }

  for (let row = 0; row < quizzesIds.length; row++) {
    let questionId = quizzesIds[row]
    let questionTitle = quizzesTitles[row]
    let alternatives = []

    for (let rowAlternative = 0; rowAlternative < quizWithQuestionsAlternative.length; rowAlternative++) {
      let result = quizWithQuestionsAlternative[rowAlternative]

      let alternative = {
        id: result.alternative_id,
        question_id: result.alternative_question_id,
        quiz_id: result.alternative_quiz_id,
        title: result.alternative_title,
        description: result.alternative_description,
        target_audience: result.alternative_target_audience,
        gender: result.alternative_gender,
        image_url: result.alternative_image_url,
      }

      if (questionId == alternative.question_id) {
        alternatives.push(alternative)
      }


    }

    questionsWithAlternatives.push({
      id: questionId,
      title: questionTitle,
      alternatives
    })

  }
  const quizTitle = quiz[0].title

  return response.status(200).json({
    id: quizId,
    title: quizTitle,
    questions: questionsWithAlternatives,
  });
}

module.exports = { getQuizWithQuestionsController };
