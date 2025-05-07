import { isAuthenticate } from "./authenticate.js"


const elementsAuth = document.querySelectorAll('.auth')

const elementsNoAuth = document.querySelectorAll('.no-auth')

console.log(isAuthenticate())
if (isAuthenticate()) {
    elementsAuth.forEach((element) => {
        element.classList.remove('invisibility')

    })
    elementsNoAuth.forEach((element) => {
        element.classList.add('invisibility')
    })
} else {
    elementsAuth.forEach((element) => {
        element.classList.add('invisibility')
    })
    elementsNoAuth.forEach((element) => {
        element.classList.remove('invisibility')
    })
}








