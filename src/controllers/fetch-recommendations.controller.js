const userModel = require("../models/user.model.js");
const recommendationsModel = require("../models/recommendations.model.js");

async function fetchRecommendationsController(request, response) {
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

  const recommendations = await recommendationsModel.findManyRecommendations(userId)

  return response.status(200).json({
    recommendations,
  });
}

module.exports = { fetchRecommendationsController };
