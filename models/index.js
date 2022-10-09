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

Post.hasMany(Blog, {
    foreignKey: "post_id",
    onDelete: "CASCADE",
});

Blog.belongsTo(User, {
    foreignKey: "user_id",
});

User.hasMany(Blog, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

module.exports = {
    User,
    Post,
    Blog,
};
