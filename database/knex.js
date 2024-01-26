//connect
const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: process.env.MYSQL_HOST || "localhost",
    port: process.env.MYSQL_PORT || "3306",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "1234",
    database: process.env.MYSQL_DATABASE || "knex",
  },
  pool: { min: 0, max: 7 },
});

//check
knex.raw("SELECT VERSION()").then(() => {
  console.log("connection to db successfully");
});

module.exports = { knex };
