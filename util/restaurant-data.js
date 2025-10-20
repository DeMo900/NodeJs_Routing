const fs = require("fs");
const path = require("path");

const filepath = path.join(__dirname, "..", "data", "restaurants.json");
//fetching data from json file
function getStoredRestaurants() {
  const fileData = fs.readFileSync(filepath);
  const restaurantArr = JSON.parse(fileData);
  console.log(restaurantArr);
  return restaurantArr;
}

function storeRestaurants(restaurant) {
  fs.writeFileSync(filepath,JSON.stringify(restaurant));
}

module.exports = {
   getStoredRestaurants,
  storeRestaurants,
};
