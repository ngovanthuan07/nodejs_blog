const path = require("path");
const express = require("express");
const app = express();
const port = 3000;
const expressLayout = require("express-ejs-layouts");

// template engine
app.use(expressLayout);
app.use(express.static(path.join(__dirname, "public")))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "resources/views"));

app.get("/", (req, res) => {
  res.render("home", {layout: "layouts/layout"});
});

app.get("/news", (req, res) => {
  res.render("news", {layout: "layouts/layout"});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});