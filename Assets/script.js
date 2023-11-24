
var api_key="06894da41b711aff533424931a15e0ec";

// Make A event listner on submit button to run a function
$("#search-button").on("click",function(event){
event.preventDefault();
// Delcare a Variable to get the value from the input field
var search = $("#search-input").val().trim();

// Weather Api
var currentWeather ="https://api.openweathermap.org/data/2.5/weather?q="+search+"&appid="+api_key;

// Fetch the api and convert it into Json
fetch(currentWeather).then(function(response){
    return response.json();
}).then(function(data){

    display_Current_weather(data); 
   console.log(data);
})



});





function display_Current_weather(data){

// Delcare some variables to create elements in Html
var section = $("<section>");
var h1 = $("<h1>");
var img = $("<img>");
var p1 = $("<p>");
var p2 = $("<p>");
var p3 = $("<p>");


// Add Classes and Id to tags
section.attr("id","today");


// Pick the main Div to show newly created Html
var Text_area = $(".Text_area");

// To clear the Textarea Every New Time
Text_area.empty();

// Declare a variable to get date value from abi and store it in a variable
var date = new Date(data.dt * 1000); // Convert timestamp to date
var dateString = date.toLocaleDateString();

h1.text(data.name + " ("+dateString+")");
img.attr("src","https://openweathermap.org/img/wn/"+ data.weather[0].icon+"@2x.png")
p1.text("Temperature: "+data.main.temp);
p2.text("Wind Speed:: "+data.wind.speed);
p3.text("Humidity: "+data.main.humidity+"%");


// Append the divs to the relative sections in html
Text_area.append(section);
section.append(h1,p1,p2,p3);
h1.append(img);
}