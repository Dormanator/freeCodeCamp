geoLocation();

/****************************************************
 * 
 * 
 *              GEOLOCATION RETREVIAL
 * 
 * 
 ****************************************************/

function geoLocation () {
    // if geolocation is avaliable in the browser
    if (navigator.geolocation) {
        // get users current position
        navigator.geolocation.getCurrentPosition( geoSuccess , geoFail );
    } else {
        // if not avail in broswer let user know
        $("#text").html("Geolocation not avaliable in your browser :("); 
    }
        // if JS and JQuery worked successfully let user know we are at work
        $("#text").html("Trying to get your position...");
};

// function the succesful geolocation query calls
function geoSuccess (response) {
    // isolcate the lat and long w/o decimals to conform to the API requirements
    let lat = Math.round(response.coords.latitude),
        long = Math.round(response.coords.longitude);

    // print let user know js is working
    $("#text").html(`Loading...`);
    // pass successful geoLocation to weather function for weather API request
    getWeather(lat, long);
}

// function the failed geolocation query calls
function geoFail () {
    $("#text").html("Unable to get your position :(");
}

/****************************************************
 * 
 * 
 *              WEATHER API REQUEST
 * 
 * 
 ****************************************************/

function getWeather (lat, long) {
    // save API address to call
    const API = 'https://fcc-weather-api.glitch.me/api/current?lat=' + lat + '&lon=' + long;
    
    // JSON API request with freeCodeCamp weather API and handleWeather as its callback function
    $.getJSON(API).done(handleWeather).fail(noWeather);
}

function handleWeather (response) {
    
    // weather object to store values of interest from API, making global so it can be passed into click event functions
    weather = {
    city: response.name,
    id: response.weather[0].id,
    desc: response.weather[0].description,
    celcius: Math.round(response.main.temp) + '&deg;C',
    farenheit: Math.round((response.main.temp * 9/5) + 32) + '&deg;F',
    sunrise: response.sys.sunrise,
    sunset: response.sys.sunset,
    };

    $("#image").html('<i class="fa fa-sun-o icon" aria-hidden="true"></i>');
    // call function to determine background icon
    weatherIcon(weather.sunrise, weather.sunset, weather.id);

    // append temperature and description
    $("#temp").html(weather.farenheit);
    $("#text").html(weather.desc);

    // show convert button now that temp is appended
    $("#convert").html('<i class="fa fa-random fa-lg" aria-hidden="true"></i>');
}

function noWeather () {
    $("#text").html("Something went wrong with the API request :( \n Please try again in a moment");
}

/****************************************************
 * 
 * 
 *              WEATHER ICON CONTROL
 * 
 * 
 ****************************************************/

    // function to display correct icon based on weather and time
    function weatherIcon (rise, set, id) {

        // finding current time to compare against sun rise and sun set
        let currentTime = Math.round(Date.now()/1000),
        // checking to see if its day or night based on sunrise and set, determine whether to show sun or moon when clear skies
        day = currentTime >= rise && currentTime < set;

        // if else handling the icons based on type of weather https://openweathermap.org/weather-conditions

        // severe weather
        if (id >= 957) {
            $("#image").html('<i class="fa fa-exclamation-triangle icon" aria-hidden="true"></i>');
        // winds
        } else if (id >= 952) {
            $("#image").html('<i class="fa fa-flag icon" aria-hidden="true"></i>');
        // clear during the day
        } else if ( (id === 951 || id === 800) && day) {
            $("#image").html('<i class="fa fa-sun-o icon" aria-hidden="true"></i>');
        // clear at night
        } else if (id === 951 || id === 800) {
            $("#image").html('<i class="fa fa-moon-o icon" aria-hidden="true">')
        // severe weather
        } else if (id >= 900) {
            $("#image").html('<i class="fa fa-exclamation-triangle icon" aria-hidden="true"></i>');
        // clouds
        } else if (id > 800) {
            $("#image").html('<i class="fa fa-cloud icon" aria-hidden="true"></i>');
        // atmospheric conditions
        } else if (id > 700) { 
            $("#image").html('<i class="fa fa-exclamation-triangle icon" aria-hidden="true"></i>');
        // snow
        } else if (id >= 600) {
            $("#image").html('<i class="fa fa-snowflake-o icon" aria-hidden="true"></i>');
        // rain
        } else if (id >= 300) {
            $("#image").html('<i class="fa fa-tint icon" aria-hidden="true"></i>');
        // thunderstorms
        } else {
            $("#image").html('<i class="fa fa-bolt icon" aria-hidden="true"></i>');
        }
    }

/****************************************************
 * 
 * 
 *              WEATHER CONVERSION CLICK
 * 
 * 
 ****************************************************/
$("#convert").click(convert);

function convert () {

    // grab the format of teh temperature (C or F) and its value
    let format = $("#temp").html().replace(/[^CF]/g,''),
        value = $("#temp").html();

    // if celcius convert to farenheit, else vice versa
    if (format === 'C') {
        value = weather.farenheit;
    } else {
        value = weather.celcius;
    }

    // append converted temp to DOM
    $("#temp").html(value);
}
