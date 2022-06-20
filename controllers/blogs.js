const jwt = require("jsonwebtoken");
const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

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
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);
  request.body.user = user._id;
  const blog = new Blog(request.body);
  // need to use the randomUser id and add the corresponding blog post as well
  user.blogs.push(blog.id);
  user.save();
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
