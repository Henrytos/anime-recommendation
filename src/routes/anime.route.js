const express = require("express");
const { fetchAllAnimesController } = require("../controllers/fetch-all-animes.controller.js");
const router = express.Router();

router.get("/", fetchAllAnimesController)

module.exports = router;