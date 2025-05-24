const userModel = require("../models/user.model.js");
const commentsModel = require("../models/comments.model.js");

function fetchCommentsController(request, response) {
    const userId = request.headers.userId;

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

    commentsModel.findManyComments(userId).then((comments) => {
        return response.status(200).json({
            comments,
        });
    });
}

module.exports = { fetchCommentsController };
