import { GetStorage, SetStorage } from "./manege-storage-session.js";

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
  "/": [
    {
      selector: ".start",
      dark: {
        file: "background-start.png",
      },
      light: {
        file: "background-start-white.png",
      },
    },
  ],
  "/index.html": [
    {
      selector: ".start",
      dark: {
        file: "background-start.png",
      },
      light: {
        file: "background-start-white.png",
      },
    },
  ],
  "/quizzes.html": [
    {
      selector: ".container",
      dark: {
        file: "back-ground-quizzes-opacity.png",
      },
      light: {
        file: "background-start-white.png",
      },
    },
  ],

  "/quiz.html": [
    {
      selector: ".background",
      dark: {
        file: "back-ground-quizzes-opacity.png",
      },
      light: {
        file: "background-start-white.png",
      },
    },
  ],
  "/anime.html": [
    {
      selector: ".start",
      dark: {
        file: "back-ground-quizzes-opacity.png",
      },
      light: {
        file: "background-start-white.png",
      },
    },
    {
      selector: ".second",
      dark: {
        file: "background-2.png",
      },
      light: {
        file: "background-2-light.png",
      },
    },
  ],
  "/dashboard.html": [
    {
      selector: ".start",
      dark: {
        file: "back-ground-quizzes-opacity.png",
      },
      light: {
        file: "background-start-white.png",
      },
    },
  ],
};

const images = {
  "/": [
    {
      selector: "#cards",
      dark: {
        file: "cards-dark.svg",
      },
      light: {
        file: "card-light.svg",
      },
    },
    {
      selector: "#logo",
      dark: {
        file: "logo-home.png",
      },
      light: {
        file: "logo-home-light.png",
      },
    },
  ],
  "/index.html": [
    {
      selector: "#cards",
      dark: {
        file: "cards-dark.svg",
      },
      light: {
        file: "card-light.svg",
      },
    },
    {
      selector: "#logo",
      dark: {
        file: "logo-home.png",
      },
      light: {
        file: "logo-home-light.png",
      },
    },
  ],
  "/quizzes.html": [
    {
      selector: "#logo",
      dark: {
        file: "logo-home.png",
      },
      light: {
        file: "logo-home-light.png",
      },
    },
  ],
  "/quiz.html": [
    {
      selector: "#logo",
      dark: {
        file: "logo-home.png",
      },
      light: {
        file: "logo-home-light.png",
      },
    },
  ],
  "/anime.html": [
    {
      selector: "#logo",
      dark: {
        file: "logo-home.png",
      },
      light: {
        file: "logo-home-light.png",
      },
    },
  ],
  "/dashboard.html": [
    {
      selector: "#logo",
      dark: {
        file: "logo-home.png",
      },
      light: {
        file: "logo-home-light.png",
      },
    },
  ],
};

const buttonTheme = document.getElementById("button_theme");

buttonTheme.addEventListener("click", () => {
  let theme = GetStorage("theme");

  let newTheme = "";

  if (theme == "dark") {
    newTheme = "light";
  } else {
    newTheme = "dark";
  }

  SetStorage("theme", newTheme);
  setTheme(newTheme);
});

window.addEventListener("load", () => {
  let theme = GetStorage("theme");

  if (!theme) {
    SetStorage("theme", "dark");
    theme = "dark";
  }

  setTheme(theme);
});

function setTheme(theme) {
  let body = document.querySelector("body");

  body.className = theme;
  SetStorage("theme", theme);

  const pallet = colors[theme];

  for (let key in pallet) {
    let value = pallet[key];
    body.style.setProperty(key, value);
  }

  const path = window.location.pathname;

  for (let position = 0; position < background[path].length; position++) {
    let elementBackground = document.querySelector(
      background[path][position].selector
    );
    const filename = background[path][position][theme].file;
    elementBackground.style.backgroundImage = `url("./assets/images/${filename}")`;
  }

  const elements = images[path];
  for (let position = 0; position < elements.length; position++) {
    let element = elements[position];
    let image = document.querySelector(element.selector);

    image.src = `./assets/images/${element[theme].file}`;
  }
}
