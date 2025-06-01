const commentModel = require("../models/comments.model.js")

async function fetchCommentsByAnimeIdController(request, response) {
    const animeId = request.params.animeId

    const comments = await commentModel.findManyByAnimeId(animeId)

    return response.status(200).json({
        comments
    })
}

module.exports = { fetchCommentsByAnimeIdController }