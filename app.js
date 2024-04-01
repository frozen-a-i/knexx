const express = require("express");
require("dotenv").config();

const app = express();
const { router } = require("./api/moneyk.js");
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", router);

app.listen(port, () => console.log("Server listening  on port", port));


