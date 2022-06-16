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
    let noteObject = new Blog(note);
    noteObject.save();
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

describe("HTTP Requests", () => {
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
    const request = await api.post("/api/blogs").send(blogObject);
    // get
    const terminalCount = await (await api.get("/api/blogs")).body.length;
    expect(initialCount === terminalCount - 1);
    // check db maybe
  });

  test("DELETE /api/blogs/:id removes one blog post", async () => {
    // check initial count of blogs in db
    const initialCount = await Blog.countDocuments({});
    // make request to delete blog by id in db
    await Blog.deleteOne({ id: blogObject.id });
    // check terminal count of blogs in db
    const terminalCount = await Blog.countDocuments({});
    // expect
    expect(initialCount === terminalCount - 1);
  });
});

afterAll(async () => {
  mongoose.connection.close();
});
