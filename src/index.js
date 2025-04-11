import "./style.css";
import "./app.js";
import getWeatherData from "./app.js";
console.log("Hello world!");

let testString = "New York City, New York";
getWeatherData(testString).then(function (result) {
  console.log(result);
});
