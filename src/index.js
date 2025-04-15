import "./style.css";
import "./app.js";
import getWeatherData from "./app.js";
console.log("Hello world!");

const searchBar = document.getElementById("search");
const searchButton = document.getElementById("search-button");
const displayDiv = document.getElementById("display");
const unitButton = document.getElementById("unit-button");
let fahrenheit = true;

function toCelsius(tempF) {
  return (tempF - 32) / (9 / 5);
}

function lerp(a, b, t) {
  let tFilter = Math.min(Math.max(t, 0.0), 1.0);
  return a + tFilter * (b - a);
}
function renderBackground(high, cloudCover, riskOfRain) {
  const body = document.getElementById("body");
  let hotColor = [255, 165, 0];
  let coldColor = [0, 0, 255];
  let tempPercentage = high / 100;
  let tempColor = [lerp(coldColor[0], hotColor[0], tempPercentage),
    lerp(coldColor[1], hotColor[1], tempPercentage),
    lerp(coldColor[2], hotColor[2], tempPercentage)]
  body.style.background = `rgb(${Math.round(tempColor[0])}, ${Math.round(tempColor[1])}, ${Math.round(tempColor[2])})`;
}

/**
 * Render the weather data for a given search
 * @param {*} searchTerm
 */
async function display(searchTerm) {
  displayDiv.textContent = "";
  try {
    let weatherData = await getWeatherData(searchTerm);
    for (let i = 0; i < 7; i++) {
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
      if (i===0) {
        renderBackground(parseFloat(high.textContent), day.cloudCover, day.precipProbability);
      }
      weatherCard.appendChild(date);
      weatherCard.appendChild(high);
      weatherCard.appendChild(low);
      weatherCard.appendChild(riskOfRain);
      weatherCard.appendChild(cloudCover);
      displayDiv.appendChild(weatherCard);
      weatherCard.addEventListener("mouseenter", () => {
        renderBackground(parseFloat(high.textContent), day.cloudCover, day.precipProbability);
      })
    }
  } catch (error) {
    console.log("Error!" + error);
  }
}

searchButton.addEventListener("click", () => {
  console.log("Searching for " + searchBar.value);
  display(searchBar.value);
});

unitButton.addEventListener("click", () => {
  if (fahrenheit) {
    unitButton.innerHTML = "°F/<b>°C</b>";
  } else {
    unitButton.innerHTML = "<b>°F</b>/°C";
  }
  fahrenheit = !fahrenheit;
});
