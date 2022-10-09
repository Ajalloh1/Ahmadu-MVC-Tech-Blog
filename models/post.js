
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
    Blog: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: "user",
          key: "id",
      },
  },
  post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: "post",
          key: "id",
      },
  },
},
{
  sequelize: conn,
  freezeTableName: true,
  underscored: true,
  modelName: "blog",
}
);

module.exports = Blog;