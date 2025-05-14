window.addEventListener("load", () => {
  const title = document.getElementById("title-quiz");
  title.classList.remove("inactive-title");
  title.classList.add("active-title");

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
    });
}
