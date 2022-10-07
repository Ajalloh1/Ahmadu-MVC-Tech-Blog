
const sequelize = require("../config/connection");
const { Model, DataTypes } = require("sequelize");


class Blog extends Model {}

Blog.init(
  {
    id: {
        type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },