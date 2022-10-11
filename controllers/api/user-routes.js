const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// getting all//
router.get('/', async (req, res) => {
    try {
      const userData = await User.findAll({
        include: [
          { model: Blog, include: { model: Reply, include: { model: User } } },
          { model: Reply, include: { model: Blog, include: { model: User } } },
        ],
      });
  
      res.status(200).json(userData);
    } catch {
      res.status(500).json(err);
    }
  });
  // get one by id
  router.get("/:id", async (req, res) => { User.findOne({
      attributes: { exclude: ["password"] },
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Post,
          attributes: ["id", "title", "post_text", "created_at"],
        },
        {
          model: Comment,
          attributes: ["id", "blog_text", "created_at"],
          include: {
            model: Post,
            attributes: ["title"],
          },
        },
      ],
    })
    .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "This user id is not found" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  