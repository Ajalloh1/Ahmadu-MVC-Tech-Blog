const withAuth = require("../../utils/auth");
const sequelize = require("../../config/connection");
const router = require("express").Router();
const { Post, User, Comment } = require("../../models");

// find all//
router.get('/', async (req, res) => {
    try {
      const replyData = await Reply.findAll({
        include: [{ model: User }, { model: Blog, include: { model: User } }],
      });
  
      res.status(200).json(replyData);
    } catch {
      res.status(500).json(err);
    }
  });