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

afterAll(async () => {
  mongoose.connection.close();
});
