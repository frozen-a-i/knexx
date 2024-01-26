const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();
const { authenticateToken } = require("../middleware/auth.js");
const { createUser, getUser } = require("../database/queries/user.js");

// ===========
// create user
// ===========
router.post("/register", async (req, res) => {
  try {
    const { fullname, username, email } = req.body;
    console.log(fullname, username, email);

    // validate request body
    if (!(fullname && username && email)) {
      return res.status(400).send({ message: "Insufficient data" });
    }

    // check if username exist
    const username_already_exist = await getUser(username);
    if (username_already_exist) {
      return res.status(400).send({ message: "Username already exists" });
    }

    // create user
    const result = await createUser(fullname, username, email);
    res.status(201).json(result);
  } catch (error) {
    return res.status(500).send(error);
  }
});

// =============
// sign-in user
// =============
router.post("/login", async (req, res) => {
  try {
    const { username } = req.body;
    console.log(username);
    // validate request body
    if (!username) {
      res.status(400).send({ message: "Username not provided" });
    }

    // check if user exist
    const user = await getUser(username);
    console.log(user);
    if (!user) {
      res.status(400).send({ message: "User not found" });
    }
    // generate token
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET || "secret", { expiresIn: "2h" });
    res.status(200).send({ accessToken });
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = { router };
