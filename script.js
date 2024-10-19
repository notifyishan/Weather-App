const apiKey = '204c68e02dbffd1e887c62ee3d94bcee';
  // Replace with your OpenWeatherMap API key
const weatherContainer = document.getElementById('weather');

// Function to get weather by location (Geolocation API)
function getWeatherByLocation(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => {
            alert('Error fetching weather data. Please try again later.');
            console.error(error);
        });
}

// Function to get weather by city name
function getWeatherByCity() {
    const city = document.getElementById('cityInput').value;
    if (!city) {
        alert('Please enter a city name.');
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => {
            alert('Error fetching weather data. Please try again later.');
            console.error(error);
        });
}

// Function to display the weather
function displayWeather(data) {
    if (data.cod !== 200) {
        alert('City not found or weather data unavailable.');
        return;
    }

    const location = `${data.name}, ${data.sys.country}`;
    const temperature = `Temperature: ${data.main.temp} °C`;
    const description = `Conditions: ${data.weather[0].description}`;
    const humidity = `Humidity: ${data.main.humidity}%`;
    const wind = `Wind Speed: ${data.wind.speed} m/s`;

    document.getElementById('location').textContent = location;
    document.getElementById('temperature').textContent = temperature;
    document.getElementById('description').textContent = description;
    document.getElementById('humidity').textContent = humidity;
    document.getElementById('wind').textContent = wind;

    const icon = data.weather[0].icon;
    document.getElementById('weatherIcon').src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

    weatherContainer.style.display = 'block';
}

// Function to detect user's location
function detectLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeatherByLocation(lat, lon);
        }, error => {
            alert('Location access denied. Please use the search option.');
            console.error(error);
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

// Automatically detect location on page load
window.onload = function() {
    detectLocation();
};
