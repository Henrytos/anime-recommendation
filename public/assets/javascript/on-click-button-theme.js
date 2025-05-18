const colors = {
  dark: {
    "--color-white": "#f3f3f3",
    "--color-background": "#141617",
    "--color-background-foreground": "#f3f3f3",
    "--color-purple-light": "#a39fbf",
    "--color-purple-black": "#313646",
    "--color-red": "#cb4648",
    "--color-red-light": "#d97f77",
  },
  light: {
    "--color-white": "#141617",
    "--color-background": "#C6C6C7",
    "--color-background-foreground": "#141617",
    "--color-purple-light": "#a39fbf",
    "--color-purple-black": "#313646",
    "--color-red": "#cb4648",
    "--color-red-light": "#d97f77",
  },
};

const background = {
  "/index.html": {
    selector: ".start",
    dark: {
      file: "background-start.png",
    },
    light: {
      file: "background-start-white.png",
    },
  },
  "/quizzes.html": {
    selector: ".container",
    dark: {
      file: "background-start.png",
    },
    light: {
      file: "background-start-white.png",
    },
  },

  "/quiz.html": {
    selector: ".background",
    dark: {
      file: "back-ground-quizzes-opacity.png",
    },
    light: {
      file: "background-start-white.png",
    },
  },
};

const buttonTheme = document.getElementById("button_theme");

buttonTheme.addEventListener("click", () => {
  let body = document.querySelector("body");
  let theme = body.className == "dark" ? "light" : "dark";

  body.className = theme;
  const pallet = colors[theme];

  for (let key in pallet) {
    let value = pallet[key];
    body.style.setProperty(key, value);
  }

  const path = window.location.pathname;
  console.log(path);
  const elementBackground = document.querySelector(background[path].selector);
  console.log(elementBackground);
  const filename = background[path][theme].file;
  elementBackground.style.backgroundImage = `url("./assets/images/${filename}")`;
});

// quizzes.html #section_container;
// index.html .start
// quiz.html .background
