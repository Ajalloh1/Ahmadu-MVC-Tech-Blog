
const dashboardRoutes = require("./dashboard-routes.js");
const apiRoutes = require("./api");
const homeRoutes = require("./home-routes.js");

const router = require("express").Router();

router.use("/api", apiRoutes);
router.use("/", homeRoutes);
router.use("/dashboard", dashboardRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;