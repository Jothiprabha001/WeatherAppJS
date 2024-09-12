//api key: 7c05b65cc2e80a1d1b84f36281626012
//select elements
const notifyElement = document.querySelector(".notify");
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temp-value p");
const descElement = document.querySelector(".temp-desc p");
const locationElement = document.querySelector(".location p");

//App data
const weather = {};
console.log(weather);
weather.temperature = {
    unit: "celsius"
}
console.log(weather);

//App const & var
const kelvin = 273;
//API key
const key = "7c05b65cc2e80a1d1b84f36281626012";

//check if browser supports geolocation
if ('geolocation in navigator') {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notifyElement.style.display = "block";
    notifyElement.innerHTML = "<p>Browser doesn't support Geolocation</p>";
}

//set user's position
function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

//show error when there is an issue with geolocation service
function showError(error) {
    notifyElement.style.display = "block"
    notifyElement.innerHTML = `<p> ${error.message} </P>`;
}

//get weather from api provider
function getWeather(latitude, longitude) {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;


    fetch(api)
        .then(function (response) {
            let data = response.json();
            return data;
        })
        .then(function (data) {
            weather.temperature.value = Math.floor(data.main.temp - kelvin);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function () {
            displayWeather();
        })

    //display weather to ui
    function displayWeather() {
        iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        descElement.innerHTML = weather.description;
        locationElement.innerHTML = `${weather.city}, ${weather.country}`;
    }

    // C to F conversion
    function celsiusToFahrenheit(temperature) {
        return (temperature * 9 / 5) + 32;
    }
    //when the user clicks on the temperature element
    tempElement.addEventListener("click", function () {
        if (weather.temperature.value === undefined) return;

        if (weather.temperature.unit == "celsius") {
            let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
            fahrenheit = Math.floor(fahrenheit);

            tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
            weather.temperature.unit = "fahrenheit";
        } else {
            tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
            weather.temperature.unit = "celsius";
        }
    });


}
