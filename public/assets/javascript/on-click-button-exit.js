import { singOut } from "./authenticate.js"

const buttonExit = document.getElementById('button-exit')


buttonExit.addEventListener("click", () => {
    singOut()
    window.location.reload()
})