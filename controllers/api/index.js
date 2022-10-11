const router = require("express").Router();

const commentRoutes = require("./comment-routes");
const userRoutes = require("./user-routes");
const postRoutes = require("./post-routes");

router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);
router.use("/users", userRoutes);

module.exports = router;