const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

//A user can have many posts
User.hasMany(Post, {
  foreignKey: 'user_id'
});

//A post belongs to one user
Post.belongsTo(User, {
  foreignKey: 'user_id'
});

//A comment belongs to one post
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

//A post can have many comments
Post.hasMany(Comment, {
    foreignKey: 'post_id'
  });

//A user can have many comments
User.hasMany(Comment, {
    foreignKey: 'user_id'
});

//A comment belongs to one user
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});


module.exports = { User, Post, Comment };
