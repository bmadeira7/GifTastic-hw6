var firstText = "Crypto-Giphy-Insanity"
$("#first").text(firstText)




var cryptoBrands = ["Bitcoin", "Ethereum", "Ripple XRP", "Stellar Lumens", "Zcash", "Monero", "Litecoin", "Dogecoin"]

for (var i = 0; i < cryptoBrands.length; i++) {

    var newButton = $("<button>");
    newButton.text(cryptoBrands[i]);
    newButton.addClass("btn")
    newButton.addClass("btn btn-success")
    newButton.addClass("m-1")
    $("#buttonDiv").append(newButton);
}


//i need to put this in a document event listener

$(document).on("click", ".btn", api)


var APIKey = "j4KXPg8Cq6fDDXmcDf6yB1xsCsqJVmc4";

// Here I am building the URL I need to query the database
function api() {
   
    var searchTerm = $(this).text();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=+" + searchTerm + "&limit=10&api_key=" + APIKey;


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        response.data.forEach(function (response) {
            var imageURL = response.images.original_still.url;
            var newImage = $('<img src="' + imageURL + '"></img>')
            $("#bitcoinGif").prepend(newImage)

           

        })
    });
//here i attempt to take asnippet from class and make the gif toggle between the still-link & the animated-link
//BUUUTT.....this part needs fixing!// 
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
}
// end of part needs fixing//   


$("#add-gif").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var userInput = $("#superInput").val().trim();

    // Adding text from the form input into a new button in the buttonDiv

    var newUserButton = $("<button>");
    newUserButton.text(userInput);
    newUserButton.addClass("btn btn-danger")
    newButton.addClass("m-1")

    $("#buttonDiv").append(newUserButton);

    api();

    
});





//STILL NEED TO DO
//i still need to add a rating for each gif

//i would like to be able to clear any visible gifs before loading the next set of gifs