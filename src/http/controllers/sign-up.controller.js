const { findByEmail, createUser } = require("../../models/user.model.js")
const { deleteFileStorage } = require("../../storage/delete-file.storage.js")

async function signUpController(request, response) {
    const { username, email, password } = request.body
    const avatarUrl = request.file.filename

    const existUserWithEmail = await findByEmail(email)

    if (existUserWithEmail) {
        deleteFileStorage(avatarUrl)

        return response.status(400).json({
            message: "there is a user with this email"
        })
    }

    await createUser(username, email, password, avatarUrl)

    return response.status(201).json({
        message: "user created successfully"
    })
}

module.exports = {
    signUpController
}