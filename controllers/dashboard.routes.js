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
///blog post//
router.get('/blog/:id', async (req, res) => {
    try {
      const blogData = await Blog.findByPk(req.params.id, {
        attributes: ["blog_text", "created_at", "title", "id"],
        include: [
          { model: User, attributes: ['username'] },
          {
            model: Reply,
            attributes: ['id', 'reply_text', 'date_created'],
            include: { model: User, attributes: ['id', 'username'] },
          },
        ],
      });
  
      if (!blogData) {
        res.render('404');
        return;
      }
  
      const loadBlog = await blogData.get({ plain: true });
      console.log(loadBlog.replies);
  
      loadBlog.replies.forEach((v) => {
        if (v.user.id === req.session.user) {
          v.matchedUser = true;
        }
      });
  
      console.log(loadBlog.replies);
  
      res.render('blog', {
        loadBlog,
        loggedIn: req.session.loggedIn,
        user: req.session.user,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  // firt time users signup//
  router.get('/signup', (req, res) => {
    res.render('signup');
    return;
  });
  ///LogIn page//
  router.get('/login', (req, res) => {
    res.render('login');
    return;
  });
});
router.get("/edit/:id", withAuth, (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["blog_text", "created_at", "title", "id"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["blog_text", "created_at", "title", "id"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    })
