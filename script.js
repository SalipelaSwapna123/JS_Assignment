// Function to fetch weather data from the OpenWeatherMap API
async function fetchWeatherData() {
  try {
    // Example API key (Replace with your own)
    const apiKey = 'YOUR_API_KEY';

    // Example city name (Replace with your desired city)
    const city = 'New York';

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Weather data not found');
    }

    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    throw error;
  }
}

// Function to update the HTML with weather data
function updateWeatherData(weatherData) {
  const weatherContainer = document.querySelector('.weather-container');
  const weatherDataElement = document.querySelector('.weather-data');

  // Check if the weather data is valid
  if (weatherData.cod !== 200) {
    weatherDataElement.textContent = 'Weather data not available.';
    return;
  }

  const cityName = weatherData.name;
  const temperature = weatherData.main.temp;
  const description = weatherData.weather[0].description;

  // Update the HTML with weather information
  const html = `
    <h2>Weather in ${cityName}</h2>
    <p>Temperature: ${temperature}°C</p>
    <p>Description: ${description}</p>
  `;

  weatherDataElement.innerHTML = html;
}

// Main function to fetch and update weather data
async function getAndDisplayWeatherData() {
  try {
    const weatherData = await fetchWeatherData();
    updateWeatherData(weatherData);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Call the main function to fetch and display weather data when the page loads
window.addEventListener('load', getAndDisplayWeatherData);
