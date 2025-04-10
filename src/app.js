// Yes this is insecure and bad practice. Unfortunately this runs entirely in the frontend so there isn't a way to prevent this.
const API_KEY = "WM3THUVYPE4Y83FWUV3G7Z8GZ";
const API_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
async function getWeatherData(location) {
  let dataResponse = await fetch(`${API_URL}${location}/?key=${API_KEY}`);
  let data = await dataResponse.json();
  console.log(data);
}

export default getWeatherData;
