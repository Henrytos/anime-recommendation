const userModel = require("../models/users.model.js")
const recommendationsModel = require("../models/recommendations.model.js")


async function getUserMetricsController(request, response) {
    const userId = request.headers.userid;

    const isBadRequestData = userId == undefined;
    if (isBadRequestData) {
        return response.status(400).json({
            message: "invalid data",
        });
    }

    const users = await userModel.findByUserId(userId)
    const usersNotFound = users.length === 0

    if (usersNotFound) {
        return response.status(401).json({
            message: "unauthorized user",
        });
    }
    const userMetricsQuizzes = await recommendationsModel.findByUserMetricsQuizzes(userId)
    const userMetricsComments = await recommendationsModel.findByUserMetricsComments(userId)
    const userMetricsMappings = await recommendationsModel.findByUserMetricsMappings(userId)

    return response.status(200).json({
        quizzes: userMetricsQuizzes,
        mappings: userMetricsMappings,
        comments: userMetricsComments
    })
}


module.exports = {
    getUserMetricsController,
};