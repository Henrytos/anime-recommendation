

async function seedAnimes(quantityPages) {
    var count = 1

    for (let page = 1; page <= quantityPages; page++) {
        const response = await fetch(`https://api.jikan.moe/v4/top/anime?page=${page}`)
        const result = await response.json()

        if (page % 3 == 0) {
            await new Promise((resolve) => setTimeout(resolve, 2000))
        }

        const animes = result.data

        for (let position = 0; position < animes.length; position++) {
            const anime = animes[position]

            const animeId = anime.mal_id
            const title = anime.title
            const image_url = anime.images.jpg.large_image_url
            const description = anime.synopsis

            const gender = anime.genres[0]?.name
            const current_target = anime.demographics[0]?.name

            if (gender && current_target && animeId == 9253) {
                console.log("---------------------------------------")
                console.log(`ANIME ID = ${animeId}`)
                console.log(`${count} - O anime: ${title} é do genero: ${gender}`)
                console.log(`${count} - e seu publico alvo é ${current_target}`)
                console.log(`${count} - image url: ${image_url}`)
                console.log(`${count} - descrição ${description}`)
                console.log("---------------------------------------")


                count++
            }
        }
    }
}


seedAnimes(3)