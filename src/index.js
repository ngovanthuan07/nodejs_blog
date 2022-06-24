const path = require("path");
const express = require("express");
const app = express();
const port = 3000;
const expressLayout = require("express-ejs-layouts");
var bodyParser = require('body-parser')

const route = require("./routes");
const db = require("./config/db");

// Connect to db
db.connect();

// template engine
app.use(expressLayout);
app.use(express.static(path.join(__dirname, "public")))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'resources', 'views'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


// Routes init
route(app)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});