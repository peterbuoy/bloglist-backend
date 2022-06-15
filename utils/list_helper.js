const blog = require("../models/blog");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (likeSum, blog) => {
    return likeSum + blog.likes;
  };
  return blogs.reduce(reducer, 0);
};

module.exports = { dummy, totalLikes };
