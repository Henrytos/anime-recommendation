const userModel = require("../models/users.model.js")
const commentModel = require("../models/comments.model.js")

function createCommentController(request, response) {
    const userId = request.headers.userid;
    const { animeId, description } = request.body

    const isBadRequest = userId == undefined || animeId == undefined || description == undefined
    if (isBadRequest) {
        return response.status(400).json({
            message: "invalid data"
        })
    }

    userModel.findByUserId(userId).then((users) => {

        const isUserNotExists = users.length == 0

        if (isUserNotExists) {
            return response.status(401).json({
                message: "unauthorized user",
            });
        }

    })

    commentModel.createComment(userId, animeId, description).then(() => {
        return response.json(200);
    }).catch(() => {
        return response.status(500).json({
            message: "internal server error"
        })
    })
}

module.exports = {
    createCommentController
}