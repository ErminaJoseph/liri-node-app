require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var fs = require("fs");
var moment = require('moment');
var spotify = new Spotify(keys.spotify);
var combineArgument = process.argv;
var searchTerm = "";
var request = process.argv[2];

for (var i = 3; i < combineArgument.length; i++) {
    if (i > 3 && i < combineArgument.length) {
      searchTerm = searchTerm + "+" + combineArgument[i];
    } else {
      searchTerm += combineArgument[i];
    }
}

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

function concertThis() {
    axios.get("https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp").then(
    function(response) {
        for (var i = 0; i < response.data.length; i++) {
            console.log("Name of Venue: " + response.data[i].venue.name);
            console.log("Venue Location: " + response.data[i].venue.city + "," + response.data[i].venue.region);
            var eventDateInfo = response.data[i].datetime;
            var eventArr = eventDateInfo.split("T");
            var eventDate = eventArr[0];
            console.log("Date of Event: " + moment(eventDate).format("MM/DD/YYYY"));
            console.log("---------------------------------------")
        }
    });
}

function spotifyThis() {
    spotify
    .search({ type: 'track', query: searchTerm })
    .then(function(response) {
        console.log(response);
    })
    .catch(function(err) {
        console.log(err);
    });
}

function movieThis() {
    if (searchTerm === "") {
        searchTerm === "Mr. Nobody"
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
        });
    }
}