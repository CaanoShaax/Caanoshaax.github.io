const apiKey = '0930a2fe32e6440cb64153148242502'; // Replace with your weatherapi.com API key
const searchBtn = document.getElementById('searchBtn');
const locationInput = document.getElementById('locationInput');
const weatherInfo = document.getElementById('weatherInfo');

searchBtn.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location) {
        getWeather(location);
    } else {
        alert('Please enter a location.');
    }
});

async function getWeather(location) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Weather data not found.');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherInfo.innerHTML = `<p>${error.message}</p>`;
    }
}

function displayWeather(data) {
    const { location, current } = data;
    const weatherHtml = `
        <h2>Weather in ${location.name}, ${location.country}</h2>
        <p>Temperature: ${current.temp_c}°C</p>
        <p>Condition: ${current.condition.text}</p>
        <p>Humidity: ${current.humidity}%</p>
        <p>Wind Speed: ${current.wind_kph} km/h</p>
    `;
    weatherInfo.innerHTML = weatherHtml;
}
