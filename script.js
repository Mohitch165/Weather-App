document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const feelsLikeDisplay = document.getElementById("feels-like");
    const iconDisplay = document.getElementById("icon");
    const errorMessage = document.getElementById("error-message");

    const API_KEY = "ced7776227de7203a76aab3afcbd720c";

    getWeatherBtn.addEventListener("click", async () => {
        const city = cityInput.value.trim();
        if(!city) return;

        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        } catch (error) {
            showError();
        } 
    });

    const fetchWeatherData = async (city) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        const response =  await fetch(url);
        if(!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();
        return data;
    }

    const displayWeatherData = (data) => {
        const {name, main, weather} = data;
        cityNameDisplay.textContent = name;
        temperatureDisplay.textContent = `Temperature : ${main.temp} °C`;
        descriptionDisplay.textContent = `Weather : ${weather[0].description}`;
        feelsLikeDisplay.textContent = `Feels like : ${main.feels_like} °C`;
        iconDisplay.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather[0].icon}.png" alt="${weather[0].description}">`;
        weatherInfo.classList.remove("hidden");
        errorMessage.classList.add("hidden");
    }

    function showError() {
        weatherInfo.classList.remove("hidden");
        errorMessage.classList.add("hidden");
      }
});