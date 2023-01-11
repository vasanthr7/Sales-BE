const express = require("express");
const app = express();
const cors = require("cors");
const bodyParse = require("body-parser");
const router = require("./router");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let port = 4001;

app.use(cors());

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));

const mysql = require("mysql");
//connection configurationn
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Soft1234",
  database: "sales",
  multipleStatements: true,
  raw: true,
});

//connect to database
db.connect();

app.listen(port);

console.log("api server starter on : " + port);

router(app, db);

