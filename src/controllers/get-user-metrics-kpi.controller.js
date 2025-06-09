const animeModel = require("../models/anime.model")
const userModel = require("../models/users.model")

async function getUserMetricsKpiController(request, response) {
    const userId = request.headers.userid

    const animes = await animeModel.getPopularAnime()


    const responseCharacters = await fetch(
        `https://api.jikan.moe/v4/anime/${animes[0].anime_id}/characters`
    );
    const characters = await responseCharacters.json();

    const charactersOrderByFavorites = characters.data
        .sort((characterA, characterB) => {
            if (characterA.favorites > characterB.favorites) {
                return -1;
            } else {
                return 1;
            }
        })
        .slice(0, 1);

    const image_url = charactersOrderByFavorites[0].character.images.jpg.image_url
    console.log({
        image_url
    })
    const engagement = await userModel.getEngagementByUserId(userId)
    const rank = await userModel.findManyPointsByUsers()

    return response.status(200).json({
        anime: { ...animes[0], image_url },
        engagement: engagement[0],
        rank,

    })
}

module.exports = { getUserMetricsKpiController }