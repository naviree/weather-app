// gather input from user in input field
// use that information to search api and display information

class MainAPI {
    constructor(apiKey) {
        this.baseUrl = "https://api.openweathermap.org/data/2.5/weather";
        this.apiKey = apiKey;
    }

    fetchWeatherData(city) {
        const url = `${this.baseUrl}?q=${city}&appid=${this.apiKey}&units=imperial`;

        return fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `Error fetching weather data: ${response.statusText}`
                    );
                }
                return response.json();
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    displayWeather(weatherData) {
        const cityWeather = document.querySelector(".city");
        if (cityWeather) {
            cityWeather.innerHTML = `Weather in: ${weatherData.name}`;
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
