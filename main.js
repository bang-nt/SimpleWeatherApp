const api = {
  key: "3ab0205c27beee6c277befdc66be8473",
  base: "https://api.openweathermap.org/data/2.5/",
};

let tut = document.querySelector(".htu");
const searchbox = document.querySelector(".search-box");
// main event
searchbox.addEventListener("keypress", setQuery);

// display htu block
searchbox.addEventListener("focus", (event) => {
  tut.style.opacity = 1;
});
searchbox.addEventListener("blur", (event) => {
  tut.style.opacity = 0;
});

window.onload(getResults("Hue"));

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
    // console.log(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults)
    .catch((err) => alert("Wrong city name"));
}

function displayResults(weather) {
  let city = document.querySelector(".date-container .location ");
  city.innerText = `${weather.name}, ${weather.sys.country}`;
  // console.log(city.innerText);
  let now = new Date();
  let datename = document.querySelector(".date-container .day-name");
  datename.innerText = dateName(now);

  let date = document.querySelector(".date-container .date-name");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".weather-container .weather-temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector(".weather-container .weather-desc");
  weather_el.innerText = weather.weather[0].main;
  changeWeatherIcon(weather_el.innerText);
}

function dateName(d) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  return `${day}`;
}
function dateBuilder(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${date} ${month} ${year}`;
}
function changeWeatherIcon(des) {
  let ic = document.getElementById("weather-icon");
  if (des == "Clouds") {
    ic.className = "weather-icon fa fa-cloud fa-3x";
    ic.style.color = "Gray";
  } else if (des == "Clear") {
    ic.className = "weather-icon fa fa-sun-o fa-3x";
    ic.style.color = "Yellow";
  } else if (des == "Snow") {
    ic.className = "weather-icon fa fa-snowflake-o fa-3x";
    ic.style.color = "White";
  } else if (des == "Rain") {
    ic.className = "weather-icon fa fa-tint fa-3x";
    ic.style.color = "Blue";
  } else {
    ic.className = "weather-icon fa fa-linux fa-3x";
    ic.style.color = "Black";
  }
}
