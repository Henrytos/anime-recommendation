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
        <div class='alternative'>
          <img src='https://m.media-amazon.com/images/S/pv-target-images/c3c9428567fd92d00815ab07ed2764bb3727bf4467caf47996474289174acc81._SX1080_FMjpg_.jpg' alt='thumb url de konosuba' />
          <div class='content-alternative'>
            <p>
              histórias onde um protagonista é transportado para um mundo diferente, seja por teletransporte, reencarnação ou outros meios.
            </p>
            <h2>
              Isekai
            </h2>
          </div>
        </div>
        <div class='alternative'>
          <img src='https://m.media-amazon.com/images/S/pv-target-images/c3c9428567fd92d00815ab07ed2764bb3727bf4467caf47996474289174acc81._SX1080_FMjpg_.jpg' alt='thumb url de konosuba' />
          <div class='content-alternative'>
            <p>
              histórias onde um protagonista é transportado para um mundo diferente, seja por teletransporte, reencarnação ou outros meios.
            </p>
            <h2>
              Isekai
            </h2>
          </div>
        </div>
        <div class='alternative'>
          <img src='https://m.media-amazon.com/images/S/pv-target-images/c3c9428567fd92d00815ab07ed2764bb3727bf4467caf47996474289174acc81._SX1080_FMjpg_.jpg' alt='thumb url de konosuba' />
          <div class='content-alternative'>
            <p>
              histórias onde um protagonista é transportado para um mundo diferente, seja por teletransporte, reencarnação ou outros meios.
            </p>
            <h2>
              Isekai
            </h2>
          </div>
        </div>
        <div class='alternative'>
          <img src='https://m.media-amazon.com/images/S/pv-target-images/c3c9428567fd92d00815ab07ed2764bb3727bf4467caf47996474289174acc81._SX1080_FMjpg_.jpg' alt='thumb url de konosuba' />
          <div class='content-alternative'>
            <p>
              histórias onde um protagonista é transportado para um mundo diferente, seja por teletransporte, reencarnação ou outros meios.
            </p>
            <h2>
              Isekai
            </h2>
          </div>
        </div>
      </div>
  </div>
  
  <div class='right'>
  <img src='./assets/images/character-makima.png' alt='image url' id='character-makima' />
  </div>
  </section>
  `;

  const questionsSection = document.querySelectorAll(".question");

  const TIME_TWO_SECONDS = 2000;
  setTimeout(() => {
    section_container.classList.add("background");
    content.innerHTML = "";
    questionsSection[0].classList.remove("slide-new");
    questionsSection[0].classList.add("slide-show");
  }, TIME_TWO_SECONDS);
}
