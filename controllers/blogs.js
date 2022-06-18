const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});

// needs a test
blogRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findOne({ id: id });
  response.json(blog);
});

blogRouter.post("/", async (request, response) => {
  const randomUser = await User.findOne({});
  request.body.user = randomUser._id;
  const blog = new Blog(request.body);
  const result = await blog.save();
  response.status(201).json(result);
});

blogRouter.delete("/:id", async (request, response) => {
  const blogID = id;
  await Blog.deleteOne({ id: blogID });
  response.send(`blog with id ${blogID} has been deleted`);
});

blogRouter.patch("/:id", async (request, response) => {
  const blogID = id;
  const filteredQueries = Object.fromEntries(
    Object.entries(request.query).filter((param) => param[0] in Blog.schema.obj)
  );
  await Blog.findOneAndUpdate({ id: blogID }, filteredQueries);
  response.send(
    `blog with id has been updated with ${JSON.stringify(filteredQueries)}`
  );
});

module.exports = blogRouter;
