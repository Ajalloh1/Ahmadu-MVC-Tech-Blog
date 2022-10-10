const sequelize = require("../config/connection");

const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");
///below is the home page for the app//
router.get("/", withAuth, (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["blog_text", "created_at", "title", "id"],
    include: [
      {
        model: Comment,
        attributes: ["blog_text", "created_at", "title", "id"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
})
.then((dbPostData) => {
  const posts = dbPostData.map((post) => post.get({ plain: true }));
  res.render("dashboard", { posts, loggedIn: true });
})
.catch((err) => {
  console.log(err);
  res.status(500).json(err);
});
