const view = require("../models/view.model");

async function getQuizWithQuestionsController(request, response) {
  const quizId = request.params.quizId;

  const quizWithQuestionsAlternative = await view.getQuizWithQuestionsAlternative(quizId)


  const questionsWithAlternatives = []

  let quantityQuestions = []

  for (let row = 0; row < quizWithQuestionsAlternative.length; row++) {
    let result = quizWithQuestionsAlternative[row]

    if (!quantityQuestions.includes(result.question_id)) {
      quantityQuestions.push(result.question_id)
    }
  }


  for (let row = 0; row < quantityQuestions.length; row++) {
    let questionId = quantityQuestions[row]
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
      // id: result.question_id,
      // title: result.quiz_title,
      alternatives
    })

  }

  return response.status(200).json({
    questions: questionsWithAlternatives,
  });
}

module.exports = { getQuizWithQuestionsController };
