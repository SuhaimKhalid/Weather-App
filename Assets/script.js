
var api_key="06894da41b711aff533424931a15e0ec";

rendor();
// Button arrays
var button_array=[];

// Make A event listner on submit button to run a function
$("#search-button").on("click",function(event){
event.preventDefault();
// Delcare a Variable to get the value from the input field
var search = $("#search-input").val().trim();

    // Start the current Weather fetch Api
    fetch_current_Weather(search);
    //Start the second fetch function 
    fetch_Forecast(search);

    addToSearchHistory(search);

    $("#search-input").val("");

});

// Function to fetch the current weather
function fetch_current_Weather(search) {
    // Weather Api
 var currentWeather ="https://api.openweathermap.org/data/2.5/weather?q="+search+"&appid="+api_key;
 
 
     fetch(currentWeather)
         .then(function (response) {
             return response.json();
         })
         .then(function (data) {
              // Start function to show data in html page
              display_Current_weather(data); 
 
         })
         
 }
 
 // Function to fetch the forcast api
 function fetch_Forecast(search) {
     // Forcast Api
     var forecast ="https://api.openweathermap.org/data/2.5/forecast?q="+search+"&appid="+api_key;
 
     fetch(forecast)
         .then(function (response) {
             return response.json();
         })
         .then(function (data) {
             // Function to display weather of upcoing days
             display_Forecast_weather(data);
         })
         
 }




// Function to show the current weather data on html page
function display_Current_weather(data){

// Delcare some variables to create elements in Html
var today_div = $("<div>");
var h1 = $("<h1>");
var img = $("<img>");
var p1 = $("<p>");
var p2 = $("<p>");
var p3 = $("<p>");

var today= $("#today");
// To clear the Textarea Every New Time
today.empty();

// Declare a variable to get date value from abi and store it in a variable
var date = new Date(data.dt * 1000); // Convert timestamp to date
var dateString = date.toLocaleDateString();

h1.text(data.name + " ("+dateString+")");273.15
img.attr("src","https://openweathermap.org/img/wn/"+ data.weather[0].icon+"@2x.png")

// convert kelvin temp to Celsius
var temp_c = data.main.temp - 273.15;
// Putting data into the html elements
p1.text("Temperature: "+temp_c.toFixed(2) + " C");
p2.text("Wind Speed: "+data.wind.speed + " KPH");
p3.text("Humidity: "+data.main.humidity+"%");


// Append the divs to the relative sections in html
today.append(today_div);
today_div.append(h1,p1,p2,p3);
h1.append(img);
}



// Function to display the weather forcast for upcoming days
function display_Forecast_weather(data) {
    // Declare a variable to get forecast div from html
    var forecastSection = $("#forecast");
    // Make it clear before running
    forecastSection.empty();

    // Add new Elemet in html
    var forcast_row=$("<div>");
    forcast_row.attr("class","forcast_row")
 

    forecastSection.append(forcast_row);
 

    for (var i = 0; i < data.list.length; i += 8) { // Display every 24 hours (8 data points per day)
        var forecastItem = data.list[i];
        var date = new Date(forecastItem.dt * 1000); // Convert timestamp to date
        var dateString = date.toLocaleDateString();

  
        var forecastCard = $("<div>");
        var dateElement = $("<h3>").text(dateString);
        var iconElement = $("<img>").attr("src", "https://openweathermap.org/img/w/" + forecastItem.weather[0].icon + ".png");

        var temp_c = forecastItem.main.temp - 273.15;

        var tempElement = $("<p>").text("Temperature: " + temp_c.toFixed(2) + " C");
        var windElement = $("<p>").text("Wind Speed: " + forecastItem.wind.speed + " KPH");
        var humidityElement = $("<p>").text("Humidity: " + forecastItem.main.humidity + "%");

        
        forecastCard.append(dateElement, iconElement, tempElement, windElement, humidityElement);
        forcast_row.append(forecastCard);

    }
}


// Function to save search in local storage
function addToSearchHistory(search) {
    var historyList = $("#history");
    // Create New Html element
    var button = $("<button>");
    // Add some classes
    button.attr("class","btn mt-3 btn-secondary")
    button.text(search);

    historyList.append(button);

    // Getting data from the local storage
    var get_local = JSON.parse(localStorage.getItem("Buttons"));
    if(get_local)
    {
        button_array=get_local;
    }
   
    // push data to the array
    button_array.push(button.text())
    // save data in local storage
    localStorage.setItem("Buttons",JSON.stringify(button_array));
}

// Function to create button from local storage
function rendor(){

    // getting data from the local storage
    var get_buttons = JSON.parse(localStorage.getItem("Buttons"));


    if(get_buttons){
        // make a loop to get all data from the local storage
        for(var i=0; i<get_buttons.length; i++){

             button_array= get_buttons;

             // Passing data
             var getval=button_array[i];

            //  Create Button element
            var storage_button = $("<button>");
            storage_button.attr("class","btn mt-3 btn-secondary")
            // add value to the button
            storage_button.text(getval);
            // apend button to the html page
            var historyList = $("#history");
            historyList.append(storage_button);

        }
  
    }
}

// Add a event listner on every button
$(".list-group").on("click","button", function (event) {
    var btn= $(this).text();
    fetch_current_Weather(btn);
    fetch_Forecast(btn);
});
