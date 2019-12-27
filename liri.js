require("dotenv").config();
var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var combineArgument = process.argv;
var searchTerm = "";

for (var i = 3; i < combineArgument.length; i++) {
    if (i > 3 && i < combineArgument.length) {
      searchTerm = searchTerm + "+" + combineArgument[i];
    } else {
      searchTerm += combineArgument[i];
    }
}

if (process.argv[2] === "concert-this") {
    axios.get("https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp").then(
    function(response) {
        for (var i = 0; i < response.data.length; i++) {
            console.log("Name of Venue: " + response.data[i].venue.name);
            console.log("Venue Location: " + response.data[i].venue.city + "," + response.data[i].venue.region);
            console.log("Date of Event: " + response.data[i].datetime);
            console.log("---------------------------------------")
        }
    });
} else if (process.argv[2] === "spotify-this-song") {
    axios.get("https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp").then(
    function(response) {
        console.log("The movie's rating is: " + response.data.imdbRating);
    });
} else if (process.argv[2] === "movie-this") {
    axios.get("http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy").then(
    function(response) {
        console.log("Title: " + response.data.Title);
        console.log("Year: " + response.data.Year);
        console.log("IMDB Rating: " + response.data.imdbRating);
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
        console.log("Country: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
    });
} else if (process.argv[2] === "do-what-it-says") {

} else {
    console.log("Please try again");
}
