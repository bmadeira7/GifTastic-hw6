var firstText = "Crypto-Giphy-Insanity"
$("#first").text(firstText)




var cryptoBrands = ["Bitcoin", "Ethereum", "Ripple XRP", "Stellar Lumens", "Zcash", "Monero", "Litecoin", "Dogecoin"]

for (var i = 0; i < cryptoBrands.length; i++) {

    var newButton = $("<button>");
    newButton.text(cryptoBrands[i]);
    newButton.addClass("btn")
    newButton.addClass("btn btn-success")
    newButton.addClass("m-1")
    newButton.attr("data-state", "still")
    $("#buttonDiv").append(newButton);
}

var state = $(newButton).attr("data-state")
//i need to put this in a document event listener

$(document).on("click", ".btn", api)


var APIKey = "j4KXPg8Cq6fDDXmcDf6yB1xsCsqJVmc4";

// Here I am building the URL I need to query the database
function api() {
    $("#bitcoinGif").empty()
    $("#ratingID").empty()
    var searchTerm = $(this).text();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=+" + searchTerm + "&limit=10&api_key=" + APIKey;


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        response.data.forEach(function (response) {
            //variables related to my still image
            var imageURL = response.images.original_still.url;
            var newImage = $('<img src="' + imageURL + '"></img>')
            // newImage.attr("data-still")
            $("#bitcoinGif").prepend(newImage)
            // here i make some variables to hold my animated gif ajax response. 
            var animateURL = response.images.looping.mp4
            var animateImage = $('<img src="' + animateURL + '"></img>')
            animateImage.attr("data-animate")


            console.log(animateURL)
            
            //here i attempt to match a rating to each gif, but they all show up grouped together at the bottom of the ten gifs
            var gifRating = response.rating
            
            $("#ratingID").append("rating:" + gifRating + " ")
            
            
            //here i try to make the data state switch to animate when the newImage var is clicked, spent hours try to rework this to make it work
            $(newImage).on("click", function () {
                if (state === "still") {
                    console.log("its STILL")
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                    $("#bitcoinGif").prepend(animateImage)
                } else {
                    console.log(newImage)
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                   
                }

            });
        })
    });
}



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

    // api();
});
//STILL NEED TO DO
//i still need to *correctly place* rating for each gif

