var firstText = "Crypto-Giphy-Insanity"
$("#first").text(firstText)



//array for building buttons 
var cryptoBrands = ["Bitcoin", "Ethereum", "Ripple XRP", "Stellar Lumens", "Zcash", "Monero", "Litecoin", "Dogecoin"]

for (var i = 0; i < cryptoBrands.length; i++) {

    var newButton = $("<button>");
    newButton.text(cryptoBrands[i]);
    newButton.addClass("btn")
    newButton.addClass("btn btn-success")
    newButton.addClass("m-1")

    $("#buttonDiv").append(newButton);
}

var state = $(newButton).attr("data-state")

//anytime an element with the class of .btn is clicked, the function named api will run
$(document).on("click", ".btn", api)

//my personal giphy api key
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

            //var with value set to the link of the still giphy image
            var imageURL = response.images.original_still.url;
            //var with value set to the link of the ANIMATED giphy image
            var animateURL = response.images.original.url
            // var setup to correctly display that image when we make it
            var newImage = $('<img class="imgClass" src="' + imageURL + '">')
            //setting the attibute of data-state STILL on the newImage var
            newImage.attr("data-state", "still")
            // linking the attribute of data-still to the still image link
            newImage.attr("data-still", imageURL)

            // linking the attribute of data-animate to the ANIMATED image link
            newImage.attr("data-animate", animateURL)
            //var to hold the location of the ratings from the response...( i wasnt able to append these ratings individually to each gif... :( )
            var gifRating = response.rating
            //inserting the newImage var into our html element with class #bitcoinGif
            $("#bitcoinGif").prepend(newImage)
            // here i make some variables to hold my animated gif ajax response. 



            

            //here i attempt to match a rating to each gif, but they all show up grouped together at the bottom of the ten gifs

            $("#ratingID").append("rating:" + gifRating + " ")





        })
    });
}
//my global on click function to toggle the still image with the animated gif
//document will listen to anything clicked, BUT must have class of imgClass, then runs the if statement
$(document).on("click", ".imgClass", function () {
    //if what is clicked has the data-state of "still", then run this....
    if ($(this).attr("data-state") === "still") {
        //we will change the giphy source to animated attribute
        $(this).attr("src", $(this).attr("data-animate"));
        //we will change the data state from still to animate
        $(this).attr("data-state", "animate");


    } else {
        //now if the data-state is already animate, we switch the url and state to the still link and attr we set up

        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");

    }

});


//this part will add new gifs when user inputs texts and hits enter or clicks "add a new gif"
$("#add-gif").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var userInput = $("#superInput").val().trim();

    // Adding text from the form input into a new button in the buttonDiv
//var that creates a new button
    var newUserButton = $("<button>");
    //sets that new buttons text to what the user input
    newUserButton.text(userInput);
    // adding 3 classes
    newUserButton.addClass("btn btn-danger")
    newButton.addClass("m-1")
//finally, appending that new button to the div
    $("#buttonDiv").append(newUserButton);

    
});
//STILL NEED TO DO
//i still need to *correctly place* rating for each gif

