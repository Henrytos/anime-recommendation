const { findByEmail } = require("../../models/user.model.js")

async function signInController(request, response) {
    const { email, password } = request.body

    const user = await findByEmail(email)
    const isNotMatchPassword = user.password_hash != password

    if (isNotMatchPassword) {
        return response.status(400).json({
            message: "incorrect credentials"
        })
    }

    return response.status(200).json({
        message: "entry successful",
        user,
    })
}

module.exports = { signInController }