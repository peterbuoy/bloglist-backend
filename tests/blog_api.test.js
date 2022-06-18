const mongoose = require("mongoose");
const config = require("../utils/config");
const logger = require("../utils/logger");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

logger.info("connecting to", config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB", error.message);
  });

beforeEach(async () => {
  await Blog.deleteMany({});
  for (let note of initialBlogs) {
    let blogObject = new Blog(note);
    await blogObject.save();
  }
});

const initialBlogs = [
  {
    title: "TEST Here",
    author: "Author Here",
    url: "Url Here",
    likes: 1337,
    id: "61c9cc56fb4ba0f27946a8ef",
  },
  {
    title: "TEST Thing",
    author: "Author Here",
    url: "Url Here",
    likes: 4912,
    id: "62a97b9586f61ffb29584977",
  },
];

describe("Blog API", () => {
  test("GET /api/blogs returns correct amount of blog posts", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(initialBlogs.length);
  });

  const blogObject = {
    title: "NEW TEST Here",
    author: "NEW TEST AUTHOR Here",
    url: "Url WOW",
    likes: 357,
    id: "61c9cc56fb4zz0f27946a8ef",
  };

  test("POST /api/blogs creates a new blog post", async () => {
    // get initial blog count
    const initialCount = await (await api.get("/api/blogs")).body.length;
    // post
    await api.post("/api/blogs").send(blogObject);
    // get
    const terminalCount = await (await api.get("/api/blogs")).body.length;
    expect(initialCount).toEqual(terminalCount - 1);
    // check db maybe
  });

  // test("DELETE /api/blogs/:id removes one blog post", async () => {
  //   // check initial count of blogs in db
  //   const initialCount = await Blog.countDocuments({});
  //   // make request to delete blog by id in db
  //   const request = await await api.delete(`/api/blogs/${blogObject.id}`);
  //   // check terminal count of blogs in db
  //   const terminalCount = await Blog.countDocuments({});
  //   // expect
  //   expect(initialCount).toEqual(terminalCount - 1);
  // });

  // implement test for updating likes
  // test("PATCH /api/blogs/:id?likes=500", async () => {
  //   const request = await api.patch(`/api/blogs/${blogObject.id}?likes=500`);
  //   const blog = await api.get(`/api/blogs/${blogObject.id}`);
  //   expect(blog.likes === 500);
  // });
});

afterAll(async () => {
  mongoose.connection.close();
});
