import { SetStorage } from "./manege-storage-session.js"

const buttonSignIn = document.getElementById('button-sign-in')


buttonSignIn.addEventListener("click", () => {
    const email = input_email.value
    const password = input_password.value

    fetchSignUser(email, password)
})

async function fetchSignUser(email, password) {
    const data = await fetch("http://localhost:3333/sign-in", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    })

    const isRequestSuccess = data.ok
    if (isRequestSuccess) {
        const response = await data.json()

        SetStorage('user_id', response.user.user_id)
        SetStorage('username', response.user.username)
        SetStorage('email', response.user.email)
        SetStorage('avatar_url', response.user.avatar_url)

        window.location.assign("index.html")
    }

}