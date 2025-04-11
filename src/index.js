import "./style.css";
import "./app.js";
import getWeatherData from "./app.js";
console.log("Hello world!");

const searchBar = document.getElementById("search");
const searchButton = document.getElementById("search-button");
const displayDiv = document.getElementById("display");

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
      high.textContent = day.tempMax;
      const low = document.createElement("div");
      low.textContent = day.tempMin;
      // Hit game risk of rain?!?!?!?!
      const riskOfRain = document.createElement("div");
      riskOfRain.textContent = day.precipProbability;
      const cloudCover = document.createElement("div");
      cloudCover.textContent = day.cloudCover;

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
