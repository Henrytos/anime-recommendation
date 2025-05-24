const userModel = require("../models/user.model.js");
const recommendationsModel = require("../models/recommendations.model.js");

function fetchRecommendationsController(request, response) {
  const userId = request.headers.userid;

  const isBadRequestData = userId == undefined;
  if (isBadRequestData) {
    return response.status(400).json({
      message: "invalid data",
    });
  }

  userModel.findByUserId(userId).then((users) => {
    const isNotExistsUser = users.length == 0;

    if (isNotExistsUser) {
      return response.status(401).json({
        message: "unauthorized user",
      });
    }
  });

  recommendationsModel
    .findManyRecommendations(userId)
    .then((recommendations) => {
      return response.status(200).json({
        recommendations,
      });
    });
}

module.exports = { fetchRecommendationsController };
