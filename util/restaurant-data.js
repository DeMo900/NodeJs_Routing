const fs = require("fs");
const path = require("path");

const filepath = path.join(__dirname, "..", "data", "restaurants.json");

function getStoredRestaurants() {
  const fileData = fs.readFileSync(filepath);
  const restaurantArr = JSON.parse(fileData);
  return restaurantArr;
}

function storeRestaurants(restaurant) {
  fs.writeFileSync(filepath, JSON.stringify(restaurant));
}

module.exports = {
  getStoredRestaurants: getStoredRestaurants,
  storeRestaurants: storeRestaurants,
};
