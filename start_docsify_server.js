const express = require("express");
const eapp = express();
const path = require("path");
eapp.use("/", express.static(path.join(__dirname, "/docs/")));
eapp.listen("23941");