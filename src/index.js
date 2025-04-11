import "./style.css";
import "./app.js";
import getWeatherData from "./app.js";
console.log("Hello world!");

const searchBar = document.getElementById("search");
const searchButton = document.getElementById("search-button");
const displayDiv = document.getElementById("display");
let fahrenheit = false;

function toCelsius(tempF) {
  return (tempF - 32) / (9 / 5);
}

/**
 * Render the weather data for a given search
 * @param {*} searchTerm
 */
async function display(searchTerm) {
  displayDiv.textContent = "";
  try {
    let weatherData = await getWeatherData(searchTerm);
    for (let i = 0; i < weatherData.length; i++) {
      let day = weatherData[i];
      console.log(day);
      const weatherCard = document.createElement("div");
      weatherCard.className = "weather-card";
      const date = document.createElement("div");
      date.textContent = day.date;

      const high = document.createElement("div");
      const low = document.createElement("div");
      if (fahrenheit) {
        high.textContent = day.tempMax;
        low.textContent = day.tempMin;
      } else {
        high.textContent = toCelsius(day.tempMax).toFixed(1);
        low.textContent = toCelsius(day.tempMin).toFixed(1);
      }

      // Hit game risk of rain?!?!?!?!
      const riskOfRain = document.createElement("div");
      riskOfRain.textContent = day.precipProbability + "% ☂";
      const cloudCover = document.createElement("div");
      cloudCover.textContent = day.cloudCover + "% ☁";

      weatherCard.appendChild(date);
      weatherCard.appendChild(high);
      weatherCard.appendChild(low);
      weatherCard.appendChild(riskOfRain);
      weatherCard.appendChild(cloudCover);
      displayDiv.appendChild(weatherCard);
    }
  } catch (error) {
    console.log("Error!" + error);
  }
}

searchButton.addEventListener("click", () => {
  console.log("Searching for " + searchBar.value);
  display(searchBar.value);
});
