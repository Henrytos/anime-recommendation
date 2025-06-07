const userModel = require("../models/users.model.js")
const commentModel = require("../models/comments.model.js")
const animeModel = require("../models/anime.model.js")

async function createCommentController(request, response) {
    const { userId, animeId, description } = request.body

    const isBadRequest = userId == undefined || animeId == undefined || description == undefined
    if (isBadRequest) {
        return response.status(400).json({
            message: "invalid data"
        })
    }

    const users = await userModel.findByUserId(userId)
    const isUserNotExists = users.length == 0

    if (isUserNotExists) {
        return response.status(401).json({
            message: "unauthorized user",
        });
    }

    const animes = await animeModel.findByAnimeId(animeId)
    if (animes.length == 0) {
        const responseJikan = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`)
        const { data: anime } = await responseJikan.json()
        const title = anime.title
        const image_url = anime.images.jpg.large_image_url
        const target_audience = anime.demographics[0]?.name
        const gender = anime.genres[0]?.name
        const score = anime.score

        console.log({ animeId, title, image_url, target_audience, gender, score })
        await animeModel.create(animeId, title, image_url, target_audience, gender, score)
        await commentModel.createComment(userId, animeId, description)

        return response.status(200).json()
    }

    await commentModel.createComment(userId, animeId, description)

    return response.status(200).json()
}

module.exports = {
    createCommentController
}