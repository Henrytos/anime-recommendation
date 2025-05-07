import { auth } from "./authenticate.js"

document.addEventListener("DOMContentLoaded", () => {
    const { avatarUrl } = auth()
    const buttonAvatarUrl = document.getElementById('preview-profile')

    buttonAvatarUrl.style.backgroundImage = `url('/images/${avatarUrl}')`
})