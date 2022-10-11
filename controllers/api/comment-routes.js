
const withAuth = require("../../utils/auth");
const { Comment } = require("../../models");

const router = require("express").Router();

router.get('/', async (req, res) => {
    try {
      const blogData = await Blog.findAll({
        include: [{ model: User }, { model: Reply, include: { model: User } }],
      });
  
      res.status(200).json(blogData);
    } catch {
      res.status(500).json(err);
    }
  });

  router.post('/', withAuth, async (req, res) => {
    try {
      const { blog_title, blog_text, user_id } = req.body;
  
      const newBlogData = await Blog.create({
        blog_title,
        blog_text,
        user_id,
      });
  
      res.status(200).json(newBlogData);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  router.delete("/:id", withAuth, async (req, res) => {
    Blob.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((dbCommentData) => {
        if (!dbCommentData) {
          res.status(404).json({ message: "No comment found with this id" });
          return;
        }
        res.json(dbCommentData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  module.exports = router;