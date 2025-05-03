const buttonSignIn = document.getElementById('button-sign-in')


buttonSignIn.addEventListener("click", () => {
    const email = input_email.value
    const password = input_password.value

    fetchSignUser(email, password)
})

async function fetchSignUser(email, password) {
    const data = await fetch("http://localhost:3333/sing-in", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    })

    if (data.ok) {
        const response = await data.json()
        console.log(response)
        console.log({
            userId: response.user.user_id
        })
        sessionStorage.setItem("id", JSON.stringify(response.user.user_id))
    }

}