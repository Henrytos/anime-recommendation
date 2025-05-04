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
        sessionStorage.setItem("id", JSON.stringify(response.user.user_id))
        window.location.assign("index.html")
    }

}