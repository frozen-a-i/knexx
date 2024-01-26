const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const { router } = require("./api/moneyk.js");
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

router.use("/api", router);

app.listen(port, () => console.log("Server listening  on port", port));
