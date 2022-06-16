const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  const result = await blog.save();
  response.status(201).json(result);
});

blogRouter.delete("/:id", async (request, response) => {
  const blogID = request.params.id;
  await Blog.deleteOne({ id: blogID });
  response.send(`blog with id ${blogID} has been deleted`);
});

blogRouter.patch("/:id", async (request, response) => {
  const blogID = request.params.id;
  const filteredQueries = Object.fromEntries(
    Object.entries(request.query).filter((param) => param[0] in Blog.schema.obj)
  );
  console.log("typeof filteredQueries", typeof filteredQueries);
  await Blog.findOneAndUpdate({ id: blogID }, filteredQueries);
  response.send(
    `blog with id has been updated with ${JSON.stringify(filteredQueries)}`
  );
});

module.exports = blogRouter;
