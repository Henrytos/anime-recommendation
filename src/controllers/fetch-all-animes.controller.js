const animeModel = require("../models/anime.model")

async function fetchAllAnimesController(request, response) {
    const animes = await animeModel.findMany()

    return response.status(200).json({
        animes
    })
}


module.exports = {
    fetchAllAnimesController
}