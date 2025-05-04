const { signInController } = require("./controllers/sign-in.controller.js")
const { signUpController } = require("./controllers/sign-up.controller.js")
const { uploadFileMiddleware } = require("./middlewares/upload-file.middleware.js")

const express = require("express")
const router = express.Router()

router.post('/sign-in', signInController)
router.post('/sign-up', uploadFileMiddleware('avatarUrl'), signUpController)

module.exports = router