const { knex } = require("../knex");

async function getUser(username) {
  return await knex("user").select("*").where({ username }).first();
}

async function createUser(fullname, usern, email) {
  return knex("user").insert({
    fullName: fullname,
    userName: usern,
    email: email,
  });
}

module.exports = { getUser, createUser };
