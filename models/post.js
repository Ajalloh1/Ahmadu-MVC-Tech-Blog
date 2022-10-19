
const sequelize = require("../config/connection");
const { Model, DataTypes } = require("sequelize");

class Post extends Model {}

Post.init(
  {
    id: {
        type: DataTypes.INTEGER,
      primaryKey: true,
      // allowNull: false,
      autoIncrement: true,
    },
    content: {
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
},
{
  sequelize: sequelize,
  freezeTableName: true,
  underscored: true,
  modelName: "post",
}
);

module.exports = Post;