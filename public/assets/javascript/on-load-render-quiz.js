window.addEventListener("load", () => {
  const href = window.location.href;
  const url = new URL(href);

  const quizId = url.searchParams.get("quiz_id");
  fetchQuizById(quizId);
  setAnimes()
});

async function setAnimes() {
  const response = await fetch("/animes")
  const data = await response.json()

  for (let position = 0; position < data.animes.length; position++) {
    let anime = data.animes[position]

    animesMapping.push({
      anime_id: anime.anime_id,
      target_audience: anime.target_audience,
      gender: anime.gender,
      points: 0
    })
  }
}

async function fetchQuizById(quizId) {
  const title = document.getElementById("title-quiz");

  const response = await fetch(`/quiz/${quizId}`)
  const data = await response.json()

  title.innerHTML = data.title;
  title.classList.remove("slide-new");
  title.classList.add("slide-show");

  const questions = data.questions;

  setSlide(questions.length)
  renderQuestions(questions);
}

function renderQuestions(questions) {
  const contentQuestions = document.getElementById("div_questions");

  let contentQuestionsHTML = ''

  for (let positionQuestion = 0; positionQuestion < questions.length; positionQuestion++) {
    let question = questions[positionQuestion]


    contentQuestionsHTML += `
      <section class='question question-1 slide-new'>
      <div class='left'>
      <h1>${question.id} - ${question.title}</h1>
      <div class='content-progress'>
          <div class='line-progress' style='width:${(positionQuestion + 1) * 10}%'></div>
          </div>
      <div class='content-alternatives'>      
        `

    for (let positionAlternative = 0; positionAlternative < question.alternatives.length; positionAlternative++) {
      let alternative = question.alternatives[positionAlternative]
      contentQuestionsHTML += `
        <div class='alternative' onclick='selectionAlternative(${alternative.id}, ${question.id}, "${alternative.target_audience}", "${alternative.gender}")'>
          <img src='https://gqcanimes.com.br/wp-content/uploads/2021/07/Konosuba-GQCA1.jpg' alt='thumb url de konosuba' />
          <div div class='content-alternative'>
            <p>
            ${alternative.description}
            </p>
            <h2>      
            ${alternative.title}
            </h2>
          </div>
      </div>`
    }

    let characterImageUrl = `character-makima.png`

    if (positionQuestion % 2 == 1) {
      characterImageUrl = 'character-power.png'
    }

    contentQuestionsHTML += `
      </div>
      </div>
      </div>

      <div class='right'>
        <img src='./assets/images/${characterImageUrl}' alt='image url' id='image character cover url: ${characterImageUrl}' />
      </div>
    </section>
    `
  }

  contentQuestionsHTML += `
    <div class="content-final slide-new">
        <h1  id="result-final">
            RESULTADO FINAL:
        </h1>


        <img id="image-question-1" src="./assets/images/loli-like.png" alt="imagem da loli da duvida">
        <img id="image-question-2" src="./assets/images/loli-congratulations.png" alt="imagem da loli da duvida 2">

    </div>
  `
  contentQuestions.innerHTML = contentQuestionsHTML


  const questionsSection = document.querySelectorAll(".question");

  const TIME_TWO_SECONDS = 2000;
  setTimeout(() => {
    content.innerHTML = "";
    questionsSection[0].classList.remove("slide-new");
    questionsSection[0].classList.add("slide-show");
  }, TIME_TWO_SECONDS);
}


