const blog = require("../models/blog");
const Blog = require("../models/blog");

/**
 * @param {[Blog]} blogs
 **/

const dummy = (blogs) => {
  return 1;
};

/**
 * @param {[Blog]} blogs
 **/
const totalLikes = (blogs) => {
  const reducer = (likeSum, blog) => {
    return likeSum + blog.likes;
  };
  return blogs.reduce(reducer, 0);
};

/**
 * @param {[Blog]} blogs
 **/
const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {};
  let favoriteBlogIndex = 0;
  let maxLikes = 0;
  blogs.forEach((blog, index) => {
    if (blog.likes > maxLikes) {
      favoriteBlogIndex = index;
      maxLikes = blog.likes;
    }
  });
  return blogs[favoriteBlogIndex];
};

module.exports = { dummy, totalLikes, favoriteBlog };
