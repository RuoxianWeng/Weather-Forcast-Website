let weather = {
    apiKey: "8e5c96c628aefcd206214624a3605e82", 
    getWeather: function(city) {
        //get data from api
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + this.apiKey
        ).then(response => response.json()).then(data => this.displayWeather(data));
    },
    displayWeather: function(data) {
        let {name, visibility} = data;
        let {description, icon} = data.weather[0];
        let {temp, feels_like, temp_min, temp_max, humidity} = data.main;
        let {speed} = data.wind;
        //change html content (dynamicaly)
        document.querySelector(".location").innerText = name;
        document.querySelector(".curtemp").innerText = temp + "°F";
        document.querySelector(".min-max-temp").innerText = temp_max + "° " + temp_min + "°";
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".condition").innerText = "Condition: " + description;
        document.querySelector(".feelslike").innerText = "Feels Like: " + feels_like + "°";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".windspeed").innerText = "Wind Speed: " + speed + " mph";
        document.querySelector(".visibility").innerText = "Visibility: " + visibility + " mi"; 
        //get dynamic background image
        //document.body.style.backgroundImage = url('https://source.unsplash.com/' + description + '');
    }, 
    search: function() {
        this.getWeather(document.querySelector(".searchfield").value);
    },
};

document.querySelector(".searchbutton").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".searchfield").addEventListener("keyup", function () {
    if (event.key == "Enter")
        weather.search();
});

//display current date
let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth()+1).padStart(2, '0');
let day = today.getDay();
let dayList = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
document.querySelector(".curday").innerText = mm + "/" + dd + " " + dayList[day-1];