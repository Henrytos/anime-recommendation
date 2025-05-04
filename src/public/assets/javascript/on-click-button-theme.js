
const buttonTheme = document.getElementById("button_theme")

buttonTheme.addEventListener("click", () => {
    let body = document.querySelector("body")
    let newTheme = body.className == "dark" ? "light" : "dark"

    body.className = newTheme
    toggleThemeInApplication(newTheme)
})

function toggleThemeInApplication(theme) {
    console.log(theme)
}