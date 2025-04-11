// Yes this is insecure and bad practice. Unfortunately this runs entirely in the frontend so there isn't a way to prevent this.
const API_KEY = "WM3THUVYPE4Y83FWUV3G7Z8GZ";
const API_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
/**
 * Fetches weather data from the Visual Crossing API
 * @param {string} location Search term for the location
 * @returns A subset of the weather data for the searched location
 */
async function getWeatherData(location) {
  let dataResponse = await fetch(`${API_URL}${location}/?key=${API_KEY}`);
  let data = await dataResponse.json();
  let processedData = [];
  for (const day in data.days) {
    let dayData = data.days[day];
    processedData.push({
      tempMax: dayData.tempmax,
      tempMin: dayData.tempmin,
      precipProbability: dayData.precipprob,
      cloudCover: dayData.cloudcover,
    });
  }
  return processedData;
}

export default getWeatherData;
