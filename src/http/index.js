
const { Router } = require("express")
const { findByEmail, createUser } = require("../models/user-model")

const router = Router()

router.post('/sing-in', async (req, res) => {
    const { email, password } = req.body

    const user = await findByEmail(email)
    const isMatchPassword = user.password_hash != password

    if (isMatchPassword) {
        return res.status(400).json({
            message: "incorrect credentials"
        })
    }

    return res.status(200).json({
        message: "entry successful",
        user,
    })
})

router.post('/users', async (req, res) => {
    const { name, email, password } = req.body

    const userWithEmail = await findByEmail(email)

    if (userWithEmail) {
        return res.status(400).json({
            message: "there is a user with this email"
        })
    }

    await createUser(name, email, password, imageUrl)

    return res.status(201).json({
        message: "user created successfully"
    })
})

module.exports = router