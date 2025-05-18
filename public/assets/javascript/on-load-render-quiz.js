window.addEventListener("load", () => {
  const href = window.location.href;
  const url = new URL(href);

  const quizId = url.searchParams.get("quiz_id");
  fetchQuizById(quizId);
});

function fetchQuizById(quizId) {
  // fetch(`http://localhost:3333/quiz/${quizId}`)
  //   .then((response) => response)
  //   .then((data) => data.json())
  //   .then((quiz) => {
  //     console.log(quiz);

  //   });
  const title = document.getElementById("title-quiz");
  title.innerHTML = "QUAL ANIME COMBINA COM VOCÊ?";
  title.classList.remove("slide-new");
  title.classList.add("slide-show");

  // const questions = quiz.questions;

  renderQuestions();
}

function renderQuestions() {
  const contentQuestions = document.getElementById("div_questions");

  // questions.map((question) => {
  //   console.log(question);

  // });

  contentQuestions.innerHTML += `
  <section class='question question-1 slide-new'>
  <div class='left'>
      <h1>1 - Qual estilo de narrativa te agrada mais ?</h1>

      <div class='content-progress'>
        <div class='line-progress'></div>
      </div>
    
      <div class='content-alternatives'>
        <div class='alternative' onclick='selectionAlternative(1, 1)'>
          <img src='https://gqcanimes.com.br/wp-content/uploads/2021/07/Konosuba-GQCA1.jpg' alt='thumb url de konosuba' />
          <div class='content-alternative'>
            <p>
              histórias onde um protagonista é transportado para um mundo diferente, seja por teletransporte, reencarnação ou outros meios.
            </p>
            <h2>
              ISEKAI
            </h2>
          </div>
        </div>
        <div class='alternative' onclick='selectionAlternative(2, 1)'>
          <img src='https://animeflix.com.br/wp-content/uploads/2024/12/My-Hero-Academia-se-atualize-sobre-a-temporada-final-do-anime-696x464.jpg' alt='thumb url de konosuba' />
          <div class='content-alternative'>
            <p>
              histórias onde um protagonista é transportado para um mundo diferente, seja por teletransporte, reencarnação ou outros meios.
            </p>
            <h2>
              SHOUNEN
            </h2>
          </div>
        </div>
        <div class='alternative' onclick='selectionAlternative(3, 1)'>
          <img src='https://m.media-amazon.com/images/S/pv-target-images/286a0e266e2521f56a810653db79e2dfa4de7e9f80286b321085bcf9e75f43fb._SX1080_FMjpg_.jpg' alt='thumb url de konosuba' />
          <div class='content-alternative'>
            <p>
              histórias onde um protagonista é transportado para um mundo diferente, seja por teletransporte, reencarnação ou outros meios.
            </p>
            <h2>
              GORE
            </h2>
          </div>
        </div>
        <div class='alternative' onclick='selectionAlternative(4, 1)'>
          <img src='https://sm.ign.com/ign_br/screenshot/default/haikyu-1_arwc.jpg' alt='thumb url de konosuba' />
          <div class='content-alternative'>
            <p>
              histórias onde um protagonista é transportado para um mundo diferente, seja por teletransporte, reencarnação ou outros meios.
            </p>
            <h2>
              SPORTS
            </h2>
          </div>
        </div>
      </div>
  </div>
  
  <div class='right'>
  <img src='./assets/images/character-makima.png' alt='image url' id='character-makima' />
  </div>
  </section>

   <section class='question question-1 slide-new'>
  <div class='left'>
      <h1>
        2 - Qual estilo de animação te mais agrada ?
      
      </h1>

      <div class='content-progress'>
        <div class='line-progress'></div>
      </div>
    
      <div class='content-alternatives'>
        <div class='alternative' onclick='selectionAlternative(1, 1)'>
          <img src='https://gqcanimes.com.br/wp-content/uploads/2021/07/Konosuba-GQCA1.jpg' alt='thumb url de konosuba' />
          <div class='content-alternative'>
            <p>
              histórias onde um protagonista é transportado para um mundo diferente, seja por teletransporte, reencarnação ou outros meios.
            </p>
            <h2>
              ISEKAI
            </h2>
          </div>
        </div>
        <div class='alternative' onclick='selectionAlternative(2, 1)'>
          <img src='https://animeflix.com.br/wp-content/uploads/2024/12/My-Hero-Academia-se-atualize-sobre-a-temporada-final-do-anime-696x464.jpg' alt='thumb url de konosuba' />
          <div class='content-alternative'>
            <p>
              histórias onde um protagonista é transportado para um mundo diferente, seja por teletransporte, reencarnação ou outros meios.
            </p>
            <h2>
              SHOUNEN
            </h2>
          </div>
        </div>
        <div class='alternative' onclick='selectionAlternative(3, 1)'>
          <img src='https://m.media-amazon.com/images/S/pv-target-images/286a0e266e2521f56a810653db79e2dfa4de7e9f80286b321085bcf9e75f43fb._SX1080_FMjpg_.jpg' alt='thumb url de konosuba' />
          <div class='content-alternative'>
            <p>
              histórias onde um protagonista é transportado para um mundo diferente, seja por teletransporte, reencarnação ou outros meios.
            </p>
            <h2>
              GORE
            </h2>
          </div>
        </div>
        <div class='alternative' onclick='selectionAlternative(4, 1)'>
          <img src='https://sm.ign.com/ign_br/screenshot/default/haikyu-1_arwc.jpg' alt='thumb url de konosuba' />
          <div class='content-alternative'>
            <p>
              histórias onde um protagonista é transportado para um mundo diferente, seja por teletransporte, reencarnação ou outros meios.
            </p>
            <h2>
              SPORTS
            </h2>
          </div>
        </div>
      </div>
  </div>
  
  <div class='right'>
  <img src='./assets/images/character-power.png' alt='image url' id='character-makima' />
  </div>
  </section>


  <div class="content-final slide-new">
      <h1  id="result-final">
          RESULTADO FINAL:
      </h1>


      <img id="image-question-1" src="./assets/images/loli-like.png" alt="imagem da loli da duvida">
      <img id="image-question-2" src="./assets/images/loli-congratulations.png" alt="imagem da loli da duvida 2">

  </div>

    <div class="content-final-anime slide-new">
      <h1  id="result-final">
          boku no hero
      </h1>
  </div>
  `;

  const questionsSection = document.querySelectorAll(".question");

  const TIME_TWO_SECONDS = 2000;
  setTimeout(() => {
    content.innerHTML = "";
    questionsSection[0].classList.remove("slide-new");
    questionsSection[0].classList.add("slide-show");
  }, TIME_TWO_SECONDS);
}
