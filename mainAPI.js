const weatherApi =
    "https://api.openweathermap.org/data/2.5/weather?zip=97223,us&appid=db56630f29f62469bc6565b10244f9a3&units=imperial";

fetch(weatherApi)
    .then((response) => {
        if (!response.ok) {
            throw Error("ERROR fetching weather data");
        }
        return response.json();
    })
    .then((data) => {
        console.log(data);
        displayWeather(data);
    })
    .catch((error) => {
        console.error("Error:", error);
    });

function displayWeather(weatherData) {
    const container = document.querySelector(".container");
    const weather = weatherData.name;
    console.log(weather);
    const temperature = Math.round(weatherData.main.temp);
    const wind = weatherData.main.humidity;
    const country = weatherData.sys.country;
    const pressure = weatherData.main.pressure;
}
