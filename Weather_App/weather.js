//Information about server and public key
const api = {
  key: "7e3f21edee540e6110af347b55eb1ab2",
  base: "https://api.openweathermap.org/data/2.5/"
}

//add keypress event on serach-box
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

//Event handler-- Keypress -- Enter key
function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

//Fetch waether data from openweather website
function getResults(query) {
  // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
  fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
    .then(weather => {

      //weather object contains inforamtion in string format which we require to convert json
      return weather.json();
    }).then((response) => {
      console.log(response)

      //function to display all information on html page
      displayResults(response)
    });
}


function displayResults(weather) {
  const city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  const now = new Date();
  const date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  const temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  const weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  const hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}


function dateBuilder(d) {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const day = days[d.getDay()];
  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}