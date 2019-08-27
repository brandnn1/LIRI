require("dotenv").config();
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
const env = process.env;
var Spotify = require('node-spotify-api');
var spotify = new Spotify({
    id: env.SPOTIFY_ID,
    secret: env.SPOTIFY_SECRET
});


//Capture input
var query = process.argv;
var type = process.argv[2];
var array = [];

//For loop to capture arguments after type is passed. puts each value into array with a + symbole between inputs
for (var i = 3; i < query.length; i++) {
    array.push(query[i]);
    array.push("+")
}
//removes the final + sign at the tail of the input
array.splice(-1);

//concatenates above arracy into single string
var searchTerm = array.join("");

//runs the switch function to determine which process was called
runIt()

function runIt() {
    switch (type) {
        case 'spotify-call':
            spotifyIt()
            break;
        case 'concert-call':
            concertIt()
            break;
        case 'movie-call':
            movieIt()
            break;
        case 'random-call':
            saysIt()
            break;
        default:
            console.log("No search value found");
    }
}

function concertIt() {
    if (searchTerm === "") {
        searchTerm = "Die Antwoord"
    }
    console.log(searchTerm)
    axios.get("https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp").then(
        function (response) {
            if (response.data.length <= 0) {
                console.log("There is no available information for this artist")
            } else {
                for (var i = 0; i < response.data.length; i++) {

                    var currentData = `\r\n
                        Venue: ${response.data[i].venue.name}
                        Location: ${response.data[i].venue.city + ", " + response.data[0].venue.region}
                        Event Date: ${moment(response.data[i].datetime).format('LLLL')}
            `
                    console.log(currentData)
                }
            }
            dataLog(currentData)

        }
    );
}



function movieIt() {

    if (searchTerm === "") {
        searchTerm = "clue"
    }

    axios.get("http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            var currentData = `\r\n
    Title: ${response.data.Title}

    Rated: ${response.data.Rated}
    Released: ${response.data.Year}
    IMDB Rating: ${response.data.imdbRating}
    Plot: ${response.data.Plot}
    Actors: ${response.data.Actors}
    Language: ${response.data.Language}
    Country: ${response.data.Country}
            `
            console.log(currentData)
            dataLog(currentData)
        }
    );


}


function spotifyIt() {

    if (searchTerm === "") {
        searchTerm = "rosa+parks"
    }
    console.log(searchTerm)
    spotify.search({
        type: 'artist,track',
        query: searchTerm
    }, function (error, data) {
        if (error) {
            return console.log('Error occurred: ' + error);
        }
        console.log('\r\n')

        var currentData = `\r\n
    Artist: ${data.tracks.items[0].artists[0].name}
    Track: ${data.tracks.items[0].name}
    Preview: ${data.tracks.items[0].preview_url}
    Album: ${data.tracks.items[0].album.name}
            `
        console.log(currentData)
        dataLog(currentData)

    });
}

//Utilize fs functionality to read content of text file and manipulate the runIt search by whatever is called in the file. In this case contents are for a spotify search
function saysIt() {
    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }

        var dataArr = data.split(",");
        type = dataArr[0];
        searchTerm = dataArr[1];
        runIt()
    });

}

//Appends the input calls to the log.txt file

var logQuery = query.splice(0, 2)
logQuery = "\r\n\r\n" + query.join(" ") + "\r\n"
console.log(logQuery)

fs.appendFile("log.txt", logQuery, function (error) {

    if (error) {
        console.log(error);
    } else {
        console.log("Input Values Logged");
    }

});

//Appends data responses to the log.txt file

function dataLog(data) {
    fs.appendFile("log.txt", data, function (error) {

        if (error) {
            console.log(error);
        } else {
            console.log("Response Data Logged");
        }

    });
}