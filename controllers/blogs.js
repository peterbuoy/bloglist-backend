const blogRouter = require("express").Router();
const Blog = require("../models/blog");

/*
4.13 Blog list expansions, step1
Implement functionality for deleting a single blog post resource.
Use the async/await syntax. Follow RESTful conventions when defining the HTTP API.
Implement tests for the functionality.

4.14 Blog list expansions, step2
Implement functionality for updating the information of an individual blog post.
Use async/await.
The application mostly needs to update the amount of likes for a blog post. You can implement this functionality the same way that we implemented updating notes in part 3.
*/

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  const result = await blog.save();
  response.status(201).json(result);
});

module.exports = blogRouter;
