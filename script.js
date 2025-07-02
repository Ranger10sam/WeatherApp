const apiKey = "4cdd00ba803f4e00b69163101250207";
const form = document.querySelector(".search-form");
const searchField = document.querySelector(".searchField");

// DOM elements to update
const temp = document.querySelector(".temp");
const tempUnit = document.querySelector(".temp-unit");
const locationElement = document.querySelector(".location");
const datetime = document.querySelector(".datetime");
const condition = document.querySelector(".condition");
const weatherIcon = document.querySelector(".weather-icon img");

// Additional details
const feelsLike = document.querySelector(".weather-details .detail-item:nth-child(1) .value");
const humidity = document.querySelector(".weather-details .detail-item:nth-child(2) .value");
const wind = document.querySelector(".weather-details .detail-item:nth-child(3) .value");
const visibility = document.querySelector(".weather-details .detail-item:nth-child(4) .value");
const uvIndex = document.querySelector(".weather-details .detail-item:nth-child(5) .value");
const pressure = document.querySelector(".weather-details .detail-item:nth-child(6) .value");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const location = searchField.value.trim();
  if (location) {
    fetchWeather(location);
  }
});

async function fetchWeather(location) {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;
    const res = await fetch(url);
    const data = await res.json();

    updateWeatherUI(data);
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
  }
}

function updateWeatherUI(data) {
  const { location, current } = data;

  // Set basic weather info
  temp.textContent = `${current.temp_c}°c`;
  tempUnit.textContent = "Celsius";
  locationElement.textContent = location.name;

  // Format localtime
  const localDate = new Date(location.localtime);
  const options = { weekday: "long", month: "short", day: "numeric", hour: "numeric", minute: "numeric" };
  const formattedDate = localDate.toLocaleString("en-US", options);
  datetime.textContent = formattedDate;

  // Set condition and icon
  condition.textContent = current.condition.text;
  weatherIcon.src = "https:" + current.condition.icon;
  weatherIcon.alt = current.condition.text;

  // Set extra weather details
  feelsLike.textContent = `${current.feelslike_c}°`;
  humidity.textContent = `${current.humidity}%`;
  wind.textContent = `${current.wind_kph} km/h`;
  visibility.textContent = `${current.vis_km} km`;
  uvIndex.textContent = current.uv.toString();
  pressure.textContent = `${current.pressure_mb} hPa`;
}

// Optional: Load default weather on first load
fetchWeather("Mumbai");
