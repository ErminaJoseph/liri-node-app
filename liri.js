// Read and set environment variables with dontenv package.
require("dotenv").config();

// Incorporating packages
var Spotify = require("node-spotify-api");
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");

// Adding spotify key
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

// declaring variables
var combineArgument = process.argv;
var searchTerm = "";
var request = process.argv[2];

// Allows multiple words to be used as fourth command in command line
for (var i = 3; i < combineArgument.length; i++) {
    if (i > 3 && i < combineArgument.length) {
      searchTerm = searchTerm + "+" + combineArgument[i];
    } else {
      searchTerm += combineArgument[i];
    }
}

// If/else statements which determines the function to be used.
if (request === "concert-this") {
    concertThis();
} else if (request === "spotify-this-song") {
    spotifyThis();
} else if (request === "movie-this") {
    movieThis();
} else if (request === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
          return console.log(err);
        }

        var dataArr =  data.split(",");
        request = dataArr[0];
        searchTerm = dataArr[1];
        
        if (request === "concert-this") {
            concertThis();
        } else if (request === "spotify-this-song") {
            spotifyThis();
        } else if (request === "movie-this") {
            movieThis();
        }
    });

} else {
    console.log("Your request was not recognized.  Please try again.");
}

// Function used if concert-this is chosen
function concertThis() {
    axios.get("https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp").then(
    function(response) {
        for (var i = 0; i < response.data.length; i++) {
            console.log("Name of Venue: " + response.data[i].venue.name);
            console.log("Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + " " + response.data[i].venue.country);
            console.log("Date of Event: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
            console.log("---------------------------------------")
        }
    })
    .catch(function(err) {
        console.log(err);
    });
}

// Function used if spotify-this-song is chosen
function spotifyThis() {
    if (searchTerm === "") {
        spotify
        .search({ type: 'track', query: "The Sign Ace of Base" })
        .then(function(response) {
            console.log("So you didn't choose anything, but here's great song from the 90's!")
            console.log("Artist: " + response.tracks.items[0].album.artists[0].name);
            console.log("Song Title: " + response.tracks.items[0].name);
            console.log("Preview: " + response.tracks.items[0].preview_url);
            console.log("Album Title: " + response.tracks.items[0].album.name);
            console.log("---------------------------------------");
        })
        .catch(function(err) {
            console.log(err);
        });
    } else {
        spotify
        .search({ type: 'track', query: searchTerm })
        .then(function(response) {
            for (var i = 0; i < response.tracks.items.length; i++ ) {
                console.log("Artist: " + response.tracks.items[i].album.artists[0].name);
                console.log("Song Title: " + response.tracks.items[i].name);
                console.log("Preview: " + response.tracks.items[i].preview_url);
                console.log("Album Title: " + response.tracks.items[i].album.name);
                console.log("---------------------------------------");
            }
        })
        .catch(function(err) {
            console.log(err);
        });
    }
}

// Function used if movie-this is chosen
function movieThis() {
    if (searchTerm === "") {
        console.log("If you haven't watched Mr. Nobody then you should: <http://www.imdb.com/title/tt0485947/>")
        console.log("It's on Netflix!");
        axios.get("http://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&apikey=trilogy").then(
        function(response) {
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        })
        .catch(function(err) {
            console.log(err);
        });
    } else {
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
        })
        .catch(function(err) {
            console.log(err);
        });
    }
}