


// Make A event listner on submit button to run a function
$("#search-button").on("click",function(event){
event.preventDefault();
// Delcare a Variable to get the value from the input field
var search = $("#search-input").val().trim();

console.log(search);
createhtml(search)

});

function createhtml(search){

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

h1.text(search);
}