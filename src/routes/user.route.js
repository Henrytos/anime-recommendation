const express = require("express");
const router = express.Router();

const {
  createUserController,
} = require("../controllers/create-user.controller.js");
const {
  authenticateWithPasswordController,
} = require("../controllers/authenticate-with-password.controller.js");
const {
  fetchRecommendationsController,
} = require("../controllers/fetch-recommendations.controller.js");
const {
  fetchCommentsController,
} = require("../controllers/fetch-comments.controller.js");
const {
  getUserMetricsController,
} = require("../controllers/get-user-metrics.controller.js");

const { getUserMetricsKpiController } = require("../controllers/get-user-metrics-kpi.controller.js")

const upload = require("../config/configUpload");

router.post("/", upload.single("avatarUrl"), createUserController);
router.post("/auth", authenticateWithPasswordController);
router.get("/recommendations", fetchRecommendationsController);
router.get("/comments", fetchCommentsController);
router.get("/metrics/chart", getUserMetricsController);
router.get("/metrics/kpi", getUserMetricsKpiController);


module.exports = router;
