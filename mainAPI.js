// gather input from user in input field
// use that information to search api and display information

class MainAPI {
    constructor(baseUrl, apiKey) {
        this.baseUrl = baseUrl;
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

    displayWeather(weatherData, containerId) {
        const container = document.getElementById(containerId);
        if (container && weatherData) {
            container.innerHTML = `Temperature in ${weatherData.name}: ${weatherData.main.temp} °F`;
        }
    }
}

// apiKey "db56630f29f62469bc6565b10244f9a3"
// baseUrl"https://api.openweathermap.org/data/2.5/weather"
