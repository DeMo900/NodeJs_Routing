const express = require("express");
const router = express.Router();

const resData = require("../util/restaurant-data");
const uuid = require("uuid");

router.get("/restaurants", function (req, res) {
  let order = req.query.order;
  let nextOrder = "desc";
  if (order !== "asc" && order !== "desc") {
    order = "asc";
  }
  if (order === "desc") {
    nextOrder = "asc";
  }
  const restaurantArr = resData.getStoredRestaurants();
  restaurantArr.sort((a, b) => {
//added to lower case so it will be sorted correctly even with capital letters
    if 
      (order === "asc" && a.name.toLowerCase() > b.name.toLowerCase() ||
       order === "desc" && b.name.toLowerCase() > a.name.toLowerCase())
     {
      return 1;
    }
    return -1;
  });
  res.render("restaurants", {
    numberOfRestaurants: restaurantArr.length,
    restaurants: restaurantArr,
    nextOrder: nextOrder,
  });
});

router.get("/restaurants/:id", function (req, res) {
  const restaurantId = req.params.id;

  const restaurant = resData
    .getStoredRestaurants()
    .find((e) => e.id === restaurantId);
  if (restaurant) {
    res.render("restaurants-detail", { rest: restaurant });
  } 
    res.status(404).render("404");

});

router.get("/recommend", function (req, res) {
  res.render("recommend");
});

router.post("/recommend", function (req, res) {
  const restaurant = req.body;
  restaurant.id = uuid.v4();
  const restaurants = resData.getStoredRestaurants();

  restaurants.push(restaurant);

  resData.storeRestaurants(restaurants);

  res.redirect("/confirm");
});

router.get("/confirm", function (req, res) {
  res.render("confirm");
});

module.exports = router;
