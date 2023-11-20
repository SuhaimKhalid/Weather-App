


// Make A event listner on submit button to run a function
$("#search-button").on("click",function(event){
event.preventDefault();
// Delcare a Variable to get the value from the input field
var search = $("#search-input").val().trim();

console.log(search);


});

