const userModel = require("../models/users.model.js");
const commentsModel = require("../models/comments.model.js");

async function fetchCommentsController(request, response) {
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

    const comments = await commentsModel.findManyComments(userId)

    return response.status(200).json({
        comments,
    });
}

module.exports = { fetchCommentsController };
