/* 
Implement a way to create new users by doing a HTTP POST-request to address api/users. 
Users have username, password and name.

Do not save passwords to the database as clear text, 
but use the bcrypt library like we did in part 4 chapter Creating new users.

NB Some Windows users have had problems with bcrypt.
If you run into problems, remove the library with command  
*/
const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/User");

userRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({ username, name, passwordHash });

  const savedUser = await user.save();

  // is it a good idea to put the passwordHash in the response?
  response.status(201).json(savedUser);
});

userRouter.get("/", async);

module.exports = userRouter;
/*
Implement a way to see the details of all users by doing a suitable HTTP request.

List of users can for example, look as follows: 
*/
