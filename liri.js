require("dotenv").config();
var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var searchTerm = process.argv[2];

if (process.argv[2] === "concert-this") {
    axios.get("https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp").then(
    function(response) {
        console.log(response);
        console.log("Name of Venue: " + response.data.venue.name);
        console.log("Venue Location: " + response.data.venue.city + "," + response.data.venue.region);
        console.log("Date of Event: " + response.data.datetime);
    })
    .catch(function(error) {
        if (error.response) {
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
        } else if (error.request) {
        console.log(error.request);
        } else {
        console.log("Error", error.message);
        }
        console.log(error.config);
    });
} else if (process.argv[2] === "spotify-this-song") {
    axios.get("https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp").then(
    function(response) {
        console.log("The movie's rating is: " + response.data.imdbRating);
    })
    .catch(function(error) {
        if (error.response) {
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
        } else if (error.request) {
        console.log(error.request);
        } else {
        console.log("Error", error.message);
        }
        console.log(error.config);
    });
} else if (process.argv[2] === "movie-this") {
    axios.get("http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy").then(
    function(response) {
        console.log("The movie's rating is: " + response.data.imdbRating);
    })

} else if (process.argv[2] === "do-what-it-says") {

} else {
    console.log("Please try again");
}
