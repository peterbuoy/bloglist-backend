const mongoose = require("mongoose");
const config = require("../utils/config");
const logger = require("../utils/logger");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const bcrypt = require("bcrypt");
const User = require("../models/user");

logger.info("Connecting to", config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info("connected to MongoDB"))
  .catch((error) => logger.error("error connecting to MongoDB", error));

const initialUsers = [
  {
    id: 1982,
    username: "Joe",
    name: "Mama",
    password: "Hunter2",
  },
  {
    id: 123,
    username: "Jane",
    name: "Concrete",
    password: "MoarPylons",
  },
];

beforeEach(async () => {
  await User.deleteMany({});
  for (let user of initialUsers) {
    let userObject = new User(user);
    await userObject.save();
  }
});

describe("User API", () => {
  test("GET /api/users", async () => {
    const response = await api.get("/api/users");
    expect(response.body).toHaveLength(initialUsers.length);
  });
});

afterAll(async () => {
  mongoose.connection.close();
});
