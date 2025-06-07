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

  if (sevenRecommendations.length == 0) {
    const title = document.getElementById("title-recommendations-animes")
    const content = document.getElementById("div_recommendations")
    title.style.display = 'none'
    content.style.display = "none"
    second.style.paddingTop = '32px'
  }

  const node = document.getElementById("spinner");
  if (node.parentNode) {
    node.parentNode.removeChild(node);
  }
}


async function renderComments(animeId) {
  const response = await fetch(`/comments/${animeId}`)
  const data = await response.json()

  const comments = data.comments

  if (comments.length == 0) {
    div_comments.innerHTML = `
      <div class='not-found'>
        <img src='./assets/images/not-found-loli.png' alt='nenhum comentario encontrado' width="427"  />
        <h1 class="title-not-found">Sem comentarios </h1>
      </div>
    `
    return
  }

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

  const { avatarUrl, username } = auth()

  avatar_profile_url.src = `./assets/uploads/${avatarUrl}`
  avatar_profile_username.innerHTML = username.toUpperCase()
  renderAnime(animeId);
  renderComments(animeId)
});
