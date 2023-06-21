const apiKey = '2cf805c8b58a4c80869144712232106';

async function getWeatherData(location) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.current;
    } catch (error) {
        console.log('Error:', error);
        throw new Error('Failed to retrieve weather data');
    }
}

function displayWeather(weatherData) {
    const info = document.getElementById('info');
    info.innerHTML = `
    <h3>${weatherData.condition.text}</h3>
    <p>Temperature: ${weatherData.temp_c}°C</p>
    <p>Humidity: ${weatherData.humidity}%</p>
    <p>Wind: ${weatherData.wind_kph} km/h</p>
  `;
}

document.getElementById('submitBtn').addEventListener('click', async function () {
    const locationInput = document.getElementById('locationInput');
    const location = locationInput.value;

    try {
        const weatherData = await getWeatherData(location);
        displayWeather(weatherData);
    } catch (error) {
        console.log('Error:', error);
        alert('Failed to retrieve weather data. Please try again.');
    }
});