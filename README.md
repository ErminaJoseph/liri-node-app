#LIRI BOT!

This application will allow you to search different API's for different information using three different commands: concert-this, spotify-this-song, movie-this.   

The concert-this command will search for any upcoming concerts for the artist specified using the Bands in Town API and will provide the artist name, location of venue, and date of event) .  

The spotify-this-song command will search Spotify for the song that was supplied using the Spotify API and the results will provide the artist name, song title, album, and the spotify preview link per each result.  If a song is not chosen, it will default to The Sign by Ace of Base.

The movie-this commant will search provide the name, year, IMDB Rating, Rotten Tomatoes Rating, Country, Rating, Plot, and Actors for the movie requested using the OMDB API.

Another command within this application is do-what-it-says, where it will read the text in random.txt, which contains either the concert-this, spotify-this-song, and movie-this commands, along with the term that should be searched.  The application will be able to determine which command should be run.

If no command is selected or it is typed incorrectly, the application will ask you to run again.