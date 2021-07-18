//Create History serach button
//Clear history

//Search city by naame
//hisstory should not be duplicate
//Unable to Make UV Call I will work on getting this 

renderButtons();

const searchBtn = document.querySelector(".searchBtn");
const displayCity = document.querySelector(".display");
const userQuery = document.querySelector(".search-Box");
const currWeather = document.querySelector('.curr-loc-weather')
const fiveDaysEL = document.querySelector('.fiveDays');



const query = userQuery.value.trim();

const apikey = "960067a331a3477fae8781bc92545b94";
//const url=  "https://api.openweathermap.org/data/2.5/forecast?q"
//
function clearDiv() {
  $(".curr-loc-weather").empty();


}
searchBtn.addEventListener("click", function (e) {
  clearDiv();

  e.preventDefault();
  const query = userQuery.value.trim();
  fetchData(query);
  //fetchFiveDay(query);
  // console.log(query);
  $(".search-Box").val("");
});

function fetchData(query) {
  if (query !== "") {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + query + "&nits=metric&appid=" + apikey)
      .then(function (response) {

        return response.json();
      }).catch((error) => {

        error.alert("issue loading page")
      })

      .then(data => {
        console.log(data)
        if (data.cod != 200) {

          alert("404 error. City Not Found!!!!");
          return;
        }

        else {
          //Save the city name in local storage and display the data in the div
          //Also Remove the city name if it is duplicate 
          createPreferenceButton(query);
          const dates = new Date(data.dt * 1000 - (data.timezone * 1000)); // minus 
          const newdates = moment(dates).format('DD/MM/YYYY')
          console.log(newdates);

          // console.log(new Date(data.dt*1000+(data.timezone*1000))); // plus

          const icon = data.weather[0].icon;
          const cityNameEL = document.createElement('h2');

          const cityiconEL = document.createElement('img');
          cityiconEL.setAttribute('src', "http://openweathermap.org/img/w/" + icon + ".png")


          cityNameEL.innerHTML = data.name + " (" + newdates + ")";

          const temp = 'Temp: ' + Math.round(data.main.temp - 273.15) + "°C";

          const citytempEL = document.createElement('div')
          citytempEL.innerHTML = temp;

          //console.log(cityName);
          const windData = 'Wind: ' + Math.round(data.wind.speed) + ' MPH';
          const windDataEL = document.createElement('div')
          windDataEL.innerHTML = windData;

          const humidityData = 'Humidity: ' + Math.round(data.main.humidity) + '%';
          const humidityDataEL = document.createElement('div')

          //Add all elements to the div
          humidityDataEL.innerHTML = humidityData;
          cityNameEL.appendChild(cityiconEL);
          currWeather.appendChild(cityNameEL);
          currWeather.appendChild(citytempEL);
          currWeather.appendChild(windDataEL);
          currWeather.appendChild(humidityDataEL);
          //
          fetchFiveDay(query);
        }
        //No UV functuion  in this API for this daily data            
      });
  } else {
    window.alert("enter City Name!!");

  }
}
//Create new buttons          
function renderButtons() {
  onclick = $(".previouSearch").empty();
  onclick = $(".fiveDays").empty();
  //empty topic buttons div
  const savedButtons = JSON.parse(localStorage.getItem("savedButtons")) || [];
  //console.log(savedButtons);
  savedButtons.forEach(topic => {

    const button = $("<button>");
    button.text(topic);
    //add a click handler
    //empty the previous result 
    // grab the value of btn for search,
    // set buttn value to input
    button.on("click", function (event) {
      event.preventDefault();
      clearDiv();

      $(".search-Box").val(topic);
      // run the query
      fetchData(topic);
     
      $(".search-Box").val("");
    })
    $(".previouSearch").append(button);
  })
}

//createPreferenceButton
function createPreferenceButton(query) {
  const savedButtons = JSON.parse(localStorage.getItem("savedButtons")) || [];
  if (!savedButtons.includes(query.toLowerCase())) {
    savedButtons.push(query.toLowerCase());
  }
  localStorage.setItem("savedButtons", JSON.stringify(savedButtons));
  renderButtons();
}

//5 Days Api Call
//Apikey https://api.weatherbit.io/v2.0/forecast/daily?city=$ 
//3ab2a294f2614d11b34738772fa9d647
function fetchFiveDay(query) {
  if (query !== "") {

    fetch("https://api.weatherbit.io/v2.0/forecast/daily?city=" + query + "&days=6&key=3ab2a294f2614d11b34738772fa9d647")
      .then(function (response) {

        return response.json();
      }).catch((error) => {

        error.alert("issue loading page");
      })

      .then(data => {

        const weatherData = data.data;

        console.log(weatherData);
        //add  current date and creat 5 days forcast 

        for (let i = 1; i < weatherData.length; i++) {
          //Creat Div to add data and set following class div class="col s12 m2 card small" id="sideCard"


          const creatCardDiv = document.createElement('div');
          creatCardDiv.setAttribute('class', 'col s12 m2 card small forcast');
          creatCardDiv.setAttribute('id', 'tiles' + i);

          const icon = weatherData[i].weather.icon;
          const cityNameEL = document.createElement('h4');
          cityNameEL.innerHTML = weatherData[i].datetime + "  ";
          const cityiconEL = document.createElement('img');
       
          cityiconEL.setAttribute('src', "https://www.weatherbit.io/static/img/icons/" + icon + ".png")
         

          const temp = 'Temp: ' + Math.round(weatherData[i].temp) + "°C";
          const citytempEL = document.createElement('div')
          citytempEL.innerHTML = temp;


          const windData = 'Wind: ' + Math.round(weatherData[i].wind_spd) + ' MPH';
          const windDataEL = document.createElement('div')
          windDataEL.innerHTML = windData;

          const humidityData = 'Humidity: ' + Math.round(weatherData[i].rh) + '%';
          const humidityDataEL = document.createElement('div')
          humidityDataEL.innerHTML = humidityData;
          //Add all elements to the div

          creatCardDiv.appendChild(cityNameEL);
          creatCardDiv.appendChild(cityiconEL);
         
          creatCardDiv.appendChild(citytempEL);
          creatCardDiv.appendChild(windDataEL);
          creatCardDiv.appendChild(humidityDataEL);
          creatCardDiv.appendChild(humidityDataEL);
          fiveDaysEL.appendChild(creatCardDiv);

        }


        //No UV functuion  in this API for this daily data            
      });
  } else {
    window.alert("enter City Name!!");

  }
}