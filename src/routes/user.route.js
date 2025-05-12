var express = require("express");
var router = express.Router();

const {
  createUserController,
} = require("../controllers/create-user.controller.js");
const {
  authenticateWithPasswordController,
} = require("../controllers/authenticate-with-password.controller.js");
const upload = require("../config/configUpload");

router.post("/cadastrar", upload.single("avatarUrl"), createUserController);
router.post("/autenticar", authenticateWithPasswordController);

module.exports = router;
