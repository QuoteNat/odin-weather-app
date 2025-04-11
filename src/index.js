import "./style.css";
import "./app.js";
import getWeatherData from "./app.js";
console.log("Hello world!");

const searchBar = document.getElementById("search");
const searchButton = document.getElementById("search-button");

let testString = "New York City, New York";
getWeatherData(testString).then(function (result) {
  console.log(result);
});

searchButton.addEventListener("click", () => {
  console.log("Searching for " + searchBar.value);
  getWeatherData(searchBar.value).then((result) => {
    console.log(result);
  });
});
