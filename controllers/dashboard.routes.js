const sequelize = require("../config/connection");

const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["post_text", "created_at", "title", "id"],
    include: [
      {
        model: Comment,
        attributes: ["post_text", "created_at", "title", "id"],
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