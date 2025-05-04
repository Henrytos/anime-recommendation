const { signInController } = require("./controllers/sign-in.controller.js")
const { signUpController } = require("./controllers/sign-up.controller.js")
const { uploadFileMiddleware } = require("./middlewares/upload-file.middleware.js")

const express = require("express")
const router = express.Router()

router.post('/sing-in', signInController)
router.post('/sing-up', uploadFileMiddleware('input_avatar_url'), signUpController)

module.exports = router