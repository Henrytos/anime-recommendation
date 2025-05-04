const buttonSignUp = document.getElementById('button-sign-up')


buttonSignUp.addEventListener("click", () => {
    const username = input_username.value
    const email = input_email.value
    const password = input_password.value
    const passwordRepeat = input_password_repeat.value
    const avatarUrl = input_avatar_url.files[0]

    const form = new FormData()

    form.append('username', username)
    form.append('email', email)
    form.append('password', password)
    form.append('avatarUrl', avatarUrl)

    fetchSignUpUser(form)
})

async function fetchSignUpUser(form) {
    const data = await fetch("http://localhost:3333/sing-up", {
        method: "POST",
        body: form
    })

    const response = await data.json()

    console.log(data)
    console.log(response)
}