const userModel = require("../models/users.model")
const recommendationsModel = require("../models/recommendations.model")
const quizModel = require("../models/quiz.model.js");
const animeModel = require("../models/anime.model.js")

const { generateAnswer } = require("../utils/generate-answer-by-gemini")

async function getRecommendationAnimeByGeminiController(request, response) {
    const userId = request.headers.userid
    const users = await userModel.findByUserId(userId)

    if (users.length == 0) {
        return response.status(400).json({
            message: 'bad request user id'
        })
    }

    const username = users[0].username


    const recommendations = await recommendationsModel.findManyRecommendations(userId)

    const genders = []

    for (let position = 0; position < recommendations.length; position++) {
        const recommendation = recommendations[position]

        if (!genders.includes(recommendation.gender)) {
            genders.push(recommendation.gender)
        }
    }

    let contentGender = ''
    for (let position = 0; position < genders.length; position++) {
        const gender = genders[position]

        contentGender += `${gender} - `
    }


    const targetAudience = []
    for (let position = 0; position < recommendations.length; position++) {
        const recommendation = recommendations[position]

        if (!targetAudience.includes(recommendation.target_audience)) {
            targetAudience.push(recommendation.target_audience)
        }
    }

    let contentTargetAudience = ''
    for (let position = 0; position < targetAudience.length; position++) {
        const target = targetAudience[position]

        contentTargetAudience += `${target} - `
    }


    const possibleRecommendations = await recommendationsModel.findManyAnimesPossibleRecommendations(userId)
    let contentPossibleRecommendations = ''
    for (let position = 0; position < possibleRecommendations.length; position++) {
        const recommendation = possibleRecommendations[position]

        contentPossibleRecommendations += `
            ${recommendation.title} - ${recommendation.gender} - ${recommendation.target_audience}
        `
    }


    const answer = await generateAnswer(username, contentGender, contentTargetAudience, contentPossibleRecommendations)

    const anime = await animeModel.findByName(answer.recommendation)
    await quizModel.createResultQuiz(1000, userId, anime[0].anime_id)

    return response.status(200).json({
        answer,
        anime: anime[0]
    })
}

module.exports = { getRecommendationAnimeByGeminiController }