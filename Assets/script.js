
var api_key="06894da41b711aff533424931a15e0ec";

// Make A event listner on submit button to run a function
$("#search-button").on("click",function(event){
event.preventDefault();
// Delcare a Variable to get the value from the input field
var search = $("#search-input").val().trim();

var query ="https://api.openweathermap.org/data/2.5/weather?q="+search+"&appid="+api_key;


fetch(query).then(function(response){
    return response.json();
}).then(function(data){

    console.log(data);
    createhtml(search, data)
    
})



});

function createhtml(search, data){

// Delcare some variable to create element in Html
var section = $("<section>");
var h1 = $("<h1>");
var i1 = $("<i>");
var p1 = $("<p>");
var p2 = $("<p>");
var p3 = $("<p>");


// Add Classes and Id to tags
section.attr("id","today");


// Pick the main Div to show newly created Html
var Text_area = $(".Text_area");
Text_area.empty();
Text_area.append(section);
section.append(h1,p1,p2,p3);
h1.append(i1);

h1.text(data.name );
// i.text(data.city.name);
p1.text("Temperature: "+data.main.temp);
p2.text("Wind Speed:: "+data.wind.speed);
p3.text("Humidity: "+data.main.humidity+"%");
}