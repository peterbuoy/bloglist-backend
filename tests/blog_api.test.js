/*Once the test is finished, refactor the route handler to use the async/await syntax instead of promises.*/
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

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

beforeEach(async () => {
  await Blog.deleteMany({});
  for (let note of initialBlogs) {
    let noteObject = new Blog(note);
    noteObject.save();
  }
});

test("GET /api/blogs returns correct amount of blog posts", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(initialBlogs.length);
});

/*
Write a test that verifies that making an HTTP POST request to the /api/blogs url 
successfully creates a new blog post. At the very least, verify that the total 
number of blogs in the system is increased by one. You can also verify that 
the content of the blog post is saved correctly to the database.
Once the test is finished, refactor the operation to use async/await instead of promises. */
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

afterAll(async () => {
  mongoose.connection.close();
});
