//VARIABLES
const apiKey = '0c5d82dca829047d1ec0e1a20bbf5dc6';
const displayCityName = document.querySelector('span');
const temperature = document.getElementsByClassName('temperature');
let cityName = 'Rosario';
let submitCity = document.getElementById('submit');
let retrievedData;
let weatherCard = document.getElementById('weatherCard');


//GETTING THE CITY NAME FROM THE INPUT
let updateCityName = () => {
    while (weatherCard.firstChild) {
        weatherCard.removeChild(weatherCard.firstChild)
    };
    weatherCard.classList.remove('background');
    const cityInput = document.getElementById('searchBar').value;
    cityName = cityInput;
    getWeather(cityName);
    
}

//FETCHING THE API DATA
const getWeather = (city) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then( (response) => response.json())
    .then(data => {
        if (data.cod != 200) {
            let createTitle = document.createElement('h2');
            createTitle.classList.add('wrong-city');
            createTitle.textContent = `The city name has not been found`;
            weatherCard.appendChild(createTitle);
        } else {

            weatherCard.classList.add('background');



            //DECONSTRUCTING DATA
            let { main } = data;
            let { temp, pressure, humidity, feels_like } = main;

            //CREATE THE TITLE
            let createTitle = document.createElement('h2');
            createTitle.classList.add('weather-title');
            createTitle.textContent = `The weather in ${city}`;

            //CREATE TEMPERATURE
            let createTemp = document.createElement('p');
            createTemp.classList.add('temperature');
            createTemp.textContent = `${(temp - 273.15).toFixed(1)}° C`;
            let bodyBackground = document.querySelector('body');
            if (temp >= 300) {
                bodyBackground.style.backgroundImage = 'url(../img/hot-place-2.jpg)';
            }
            if (temp >= 283 && temp < 300 ) {
                bodyBackground.style.backgroundImage = 'url(../img/sky-2.jpg)';
            }
            if (temp < 283) {
                bodyBackground.style.backgroundImage = 'url(../img/cold-place-2.jpg)';
            }

            //CREATE "FEELS LIKE"
            let createFeelsLike = document.createElement('p');
            createFeelsLike.classList.add('feels-like');
            createFeelsLike.textContent = `Feels like: ${(feels_like - 273.15).toFixed(1)}°`

            //CREATE HUMIDITY
            let createHumidity = document.createElement('p');
            createHumidity.classList.add('humidity');
            createHumidity.textContent = `Humidity: ${humidity}%`;

            //CREATE PRESSURE
            let createPressure = document.createElement('p');
            createPressure.classList.add('pressure');
            createPressure.textContent = `Pressure: ${pressure} hPa`    

            //APPENDING EVERYTHING
            weatherCard.append(createTitle, createTemp, createHumidity, createFeelsLike, createPressure);
        }
    });
}

//EVENT LISTENERS FOR THE INPUT
const retrieveInputByIcon = submitCity.addEventListener('click', updateCityName);
const retrieveInputByEnter = document.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        updateCityName();
    }
});





