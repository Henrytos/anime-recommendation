const userModel = require("../models/users.model.js");
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


  const page = Number(request.query.page) || 1
  const perPage = 10



  const recommendations = await recommendationsModel.findManyRecommendations(userId)

  const filtersGender = []

  for (let position = 0; position < recommendations.length; position++) {
    const recommendation = recommendations[position]

    if (!filtersGender.includes(recommendation.gender)) {
      filtersGender.push(recommendation.gender)
    }
  }

  const filtersTargetAudience = []

  for (let position = 0; position < recommendations.length; position++) {
    const recommendation = recommendations[position]

    if (!filtersTargetAudience.includes(recommendation.target_audience)) {
      filtersTargetAudience.push(recommendation.target_audience)
    }
  }

  const recommendationsFilter = []

  const gender = request.query.gender || "all"
  const targetAudience = request.query.targetAudience || "all"

  for (let positionRecommendation = 0; positionRecommendation < recommendations.length; positionRecommendation++) {
    const recommendationTarget = recommendations[positionRecommendation]

    if (gender !== "all" && targetAudience !== "all" && recommendationTarget.gender == gender && recommendationTarget.target_audience == targetAudience) {
      recommendationsFilter.push(recommendationTarget)
    }

    if (gender !== "all" && recommendationTarget.gender == gender && targetAudience === "all") {
      recommendationsFilter.push(recommendationTarget)
    }

    if (targetAudience !== "all" && recommendationTarget.target_audience == targetAudience && gender === "all") {
      recommendationsFilter.push(recommendationTarget)
    }

    if (gender == "all" && targetAudience == "all") {
      recommendationsFilter.push(recommendationTarget)
    }
  }

  const maxPages = Math.ceil(recommendationsFilter.length / perPage)

  if (page > maxPages) {
    return response.status(400).json({
      message: "invalid page",
    });
  }

  const recommendationFilterByPage = recommendationsFilter.slice((page - 1) * perPage, perPage * page)

  return response.status(200).json({
    page,
    maxPages,
    filtersGender,
    filtersTargetAudience,
    recommendations: recommendationFilterByPage
  });
}

module.exports = { fetchRecommendationsController };
