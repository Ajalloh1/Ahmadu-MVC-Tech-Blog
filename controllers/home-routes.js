const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const router = require("express").Router();

router.get("/", async (req, res) => {
    console.log(req.session);
  
    Post.findAll({
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
        const post = dbPostData.get({ plain: true });
        res.render("edit-posts", { post, loggedIn: true });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  //login page//
  router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
      res.redirect("/");
      return;
    }
    res.render("login");
  });
  //signup//
  router.get("/signup", (req, res) => {
    res.render("signup");
  });
  
  router.get("/post/:id", (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["post_text", "title", "created_at", "id"],
      include: [
        {
          model: Comment,
          attributes: ["blog_text", "post_id", "user_id", "created_at", "id"],
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
        if (!dbPostData) {
          res.status(404).json({ message: "No post associated with this id found" });
          return;
        }
  
        const post = dbPostData.get({ plain: true });
  
        res.render("single-post", { post, loggedIn: req.session.loggedIn });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  module.exports = router;