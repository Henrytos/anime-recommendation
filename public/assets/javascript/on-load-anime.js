import { auth } from "./authenticate.js";

async function renderAnime(animeId) {
  if (!animeId) {
    alert("requisição mal feita");
  }

  const responseAnime = await fetch(
    `https://api.jikan.moe/v4/anime/${animeId}/full`
  );
  if (!responseAnime.ok) {
    alert("não foi possivel encontrar este anime");
  }

  const anime = await responseAnime.json();

  const responseCharacters = await fetch(
    `https://api.jikan.moe/v4/anime/${animeId}/characters`
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
    .slice(0, 4);

  const responseRecommendations = await fetch(
    `https://api.jikan.moe/v4/anime/${animeId}/recommendations`
  );
  const recommendations = await responseRecommendations.json();
  const sevenRecommendations = recommendations.data.slice(0, 7);

  /*
        ids: 
        h1_anime_title
        p_anime_description
        img_anime_preview_cover
        
        div_characters
        div_recommendations
    */

  h1_anime_title.innerHTML = anime.data.title;
  p_anime_description.innerHTML = anime.data.synopsis.slice(0, 800) + "...";
  img_anime_preview_cover.src = anime.data.images.jpg.large_image_url;


  for (
    let position = 0;
    position < charactersOrderByFavorites.length;
    position++
  ) {
    let { character } = charactersOrderByFavorites[position];

    div_characters.innerHTML += `
                <div class='character'>
                    <img src='${character.images.jpg.image_url}'
                        alt='thumb url de konosuba' />
                    <span></span>
                    <h2>
                        ${character.name}
                    </h2>
                </div>
                `;
  }

  for (let position = 0; position < sevenRecommendations.length; position++) {
    let recommendation = sevenRecommendations[position];
    div_recommendations.innerHTML += `
         <a href='./anime.html?animeId=${recommendation.entry.mal_id}' class='poster'>
            <img src='${recommendation.entry.images.jpg.large_image_url}' alt='thumb url de konosuba' />
            <span></span>
            <h2>
            ${recommendation.entry.title}
            </h2>
        </a>
        `;
  }
}


async function renderComments(animeId) {
  const response = await fetch(`/comments/${animeId}`)
  const data = await response.json()

  const comments = data.comments


  let commentsContent = ''

  for (let position = 0; position < comments.length; position++) {
    let comment = comments[position]

    commentsContent += `
    <div class="comment">
        <img src="./assets/uploads/${comment.avatar_url}"
            alt="" class="profile-comment">
        <div class="details-comment">
            <div class="top">
                <h3>
                  ${comment.username}
                </h3>
                <p>
                    ${comment.time_relative}
                </p>
            </div>
            <p>
                ${comment.description}
            </p>
        </div>
    </div>
    `
  }


  div_comments.innerHTML = commentsContent
}

window.addEventListener("load", () => {
  const url = new URL(window.location.href);
  const animeId = url.searchParams.get("animeId");

  renderAnime(animeId);
  renderComments(animeId)
});
