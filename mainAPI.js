/**
 * The `MainAPI` class is responsible for fetching weather data from the OpenWeatherMap API and displaying it on a webpage.
 */
class MainAPI {
    /**
     * Initializes the `MainAPI` object with the provided API key and sets the base URL for the API requests.
     * @param {string} apiKey - The API key used to authenticate the requests to the OpenWeatherMap API.
     */
    constructor(apiKey) {
        this.baseUrl = "https://api.openweathermap.org/data/2.5/weather";
        this.apiKey = apiKey;
    }

    /**
     * Fetches weather data for the specified city from the OpenWeatherMap API.
     * @param {string} city - The name of the city to fetch weather data for.
     * @returns {Promise<object>} - A promise that resolves to the weather data in JSON format.
     */
    async fetchWeatherData(city) {
        const url = `${this.baseUrl}?q=${city}&appid=${this.apiKey}&units=imperial`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(
                    `Error fetching weather data: ${response.statusText}`
                );
            }
            return response.json();
        } catch (error) {
            console.error("Error:", error);
        }
    }

    /**
     * Displays the weather information on the webpage.
     * @param {object} weatherData - The weather data to display.
     */
    displayWeather(weatherData) {
        const cityWeather = document.querySelector(".city");
        const cityTemp = document.querySelector(".weather-temp");
        const cityHumidity = document.querySelector(".humidity");
        const cityWindSpeed = document.querySelector(".wind-num");
        if (cityWeather && cityTemp) {
            cityWeather.innerHTML = `${weatherData.name}`;
            cityTemp.innerHTML = `${Math.round(weatherData.main.temp)} ℉`;
            cityHumidity.innerHTML = `${weatherData.main.humidity} %`;
            cityWindSpeed.innerHTML = `${Math.round(
                weatherData.wind.speed
            )} mph`;
        }
    }
}

const key = new MainAPI("db56630f29f62469bc6565b10244f9a3");

document.querySelector(".search").addEventListener("submit", (event) => {
    event.preventDefault();

    const city = document.querySelector(".search-bar").value;

    if (city) {
        key.fetchWeatherData(city).then((data) => {
            if (data) {
                key.displayWeather(data);
            }
        });
    }
});
