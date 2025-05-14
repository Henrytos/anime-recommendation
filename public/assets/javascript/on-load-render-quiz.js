window.addEventListener("load", () => {
  section_container.style.backgroundImage = "url('')";

  const title = document.getElementById("title-quiz");
  title.classList.remove("inactive-title");
  title.classList.add("active-title");
});
