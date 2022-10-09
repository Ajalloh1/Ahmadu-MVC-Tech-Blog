const User = require("./User");
const Post = require("./Post");
const Blog = require("./Comment");

Post.belongsTo(User, {
    foreignKey: "user_id",
});

User.hasMany(Post, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

Blog.belongsTo(Post, {
    foreignKey: "post_id",
});

