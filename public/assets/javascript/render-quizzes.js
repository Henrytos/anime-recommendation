import { auth } from "./authenticate.js";

async function renderQuizzes() {
  const data = await fetch("/quiz/");
  const response = await data.json();

  const quizzes = response.quizzes;
  console.log(quizzes);

  let quizzesTexts = "";

  if (quizzes.length == 0) {
    quizzesTexts +=
      "<div class='not-found'> <img src='./assets/images/not-found.png' alt='não encontrado quizzes' width='427' height='307.89' /><h2>Sem quizzes disponíveis.</h2> <h3>Tente novamente mais tarde.</h3> </div>";
    section_container.style.backgroundImage = "url('')";
  }

  for (let position = 0; position < quizzes.length; position++) {
    let quiz = quizzes[position];

    const { userId } = auth()

    let linkUrl = "./sign-in.html"
    if (userId) {
      linkUrl = `./quiz.html?quiz_id=${quiz.quiz_id}`
    }

    let textLink = "Faça o login primeiro"
    if (userId) {
      textLink = "Clique Aqui para fazer"
    }

    console.log(quiz)

    quizzesTexts += ` 
      <div class="quiz" id="quiz-${quiz.quiz_id}">
                    <img src="${quiz.thumb_url}"
                        alt="thumb quiz de ${quiz.title}">
                    <h3>${quiz.title}</h3>
                    <p>${quiz.description} (${quiz.how_long_in_days})</p>

                    <a href="${linkUrl}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-square-arrow-out-up-right-icon lucide-square-arrow-out-up-right">
                            <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
                            <path d="m21 3-9 9" />
                            <path d="M15 3h6v6" />
                        </svg>
                        <span>
                          ${textLink}
                        </span>
                    </a>
                </div>
                `;
  }

  div_quizzes.innerHTML = quizzesTexts;
}

window.addEventListener("load", () => {
  renderQuizzes();
});
