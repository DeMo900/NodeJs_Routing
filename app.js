const path = require("path");

const express = require("express");

const defaultRoute = require("./routes/default");
const restaurantRoute = require("./routes/restaurants");

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use("/", defaultRoute);
app.use("/", restaurantRoute);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(function (req, res) {
  res.status(404).render("404");
});

app.use(function (error, req, res, next) {
  res.status(500).render("500");
});

app.listen(3000);
