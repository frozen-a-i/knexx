const express = require("express");
const router = express.Router();
const knex = require("../database");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("../middleware/auth.js");

const posts = [
  {
    username: "anna",
    title: "post 1",
  },
  {
    username: "elsa",
    title: "post 2",
  },
];

//login jwt
router.get("/posts", authenticateToken, (req, res) => {
  res.json(posts.filter((post) => post.username === req.user.name));
  console.log(req.user.name);
});

router.post("/login", (req, res) => {
  //autenticate user
  const { username } = req.body;
  const user = { name: username };

  // const ans=createUser(fullname,username, email);

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  // res.json({ accessToken: accessToken })
  res.json(ans);
});

router.post("/", async (req, res) => {
  console.log(2);
  try {
    //select
    // const table1 = await knex("user");
    // res.json(table1)
    const { fullname, username, email } = req.body;
    console.log(fullname, username, email);
    const result = createUser(fullname, username, email);
    res.json(result);
    //insert

    // await knex('user')
    //     .insert({
    //         fullName:'Ismoilova Anaxon',
    //         userName: 'Frozenai',
    //         email: 'ismoilova@example.com'

    //     })
    // await knex('wallet')
    //     .insert({
    //         ID:1,
    //         balance: 0,
    //         currency: 0

    //     })
  } catch (error) {
    throw error;
  }
});

// export async function getUser(email) {
//     // const [rows] = await pool.query(`
//     // SELECT * FROM users
//     // WHERE email=?`, [email])

//     // // return rows[0]
//     // const result = knex(user)
//     //     .join('wallet', 'user.ID', '=', 'wallet.id')
//     //     console.log(json(result));
//     // return json(result);
// }
async function createUser(fullname, usern, email) {
  // const [rows] = await knex.pool.query(` SELECT * FROM user WHERE username=?`, [usern])
  // console.log(rows);
  const lst = await knex("user").select({ username: usern });
  console.log(lst.length);
  if (lst.length == 0) {
    try {
      const result = await knex("user").insert({
        fullName: fullname,
        userName: usern,
        email: email,
      });

      return result;
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("Please write new username!!!");
  }
}

module.exports = { router };
