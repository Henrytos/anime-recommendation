window.addEventListener("load", () => {
  const href = window.location.href;
  const url = new URL(href);

  const quizId = url.searchParams.get("quiz_id");
  fetchQuizById(quizId);
});

function fetchQuizById(quizId) {
  fetch(`http://localhost:3333/quiz/${quizId}`)
    .then((response) => response)
    .then((data) => data.json())
    .then((quiz) => {
      console.log(quiz);
      const title = document.getElementById("title-quiz");
      title.innerHTML = quiz.title;
      title.classList.remove("slide-new");
      title.classList.add("slide-show");

      const questions = quiz.questions;

      renderQuestions(questions);
    });
}

function renderQuestions(questions) {
  const contentQuestions = document.getElementById("div_questions");

  questions.map((question) => {
    console.log(question);
    contentQuestions.innerHTML += `
    <section class='question question-${question.question_id} slide-new'>
    <div class='left'>
    <h1> ${question.title}</h1>

    <div class='content-progress'>
    <div class='line-progress'></div>
    </div>
    
    <div class='content-alternatives'>
    
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
  });
}
