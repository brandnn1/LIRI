require("dotenv").config();
var axios = require("axios");
var moment = require("moment");


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

function runIt(){
switch (type) {
    case 'spotify-this-song':
        spotifyIt()
        break;
    case 'concert-this':
        concertIt()
        break;
    case 'movie-this':
        movieIt()
        break;
    case 'do-what-it-says':
        itSays()
        break;
    default:
        console.log("No search value found");
}}

function concertIt() {
    if (searchTerm === "") {
        console.log('\n')
        console.log("No artist entered.")
        console.log('\n')
    } else {
        console.log(searchTerm)
        axios.get("https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp").then(
        function (response) {
           if(response.data.length <= 0) {
               console.log("There is no available information for this artist")
           }else {
            for(var i=0; i < response.data.length; i++) {

                var currentData = `\n
    Venue: ${response.data[i].venue.name}
    Location: ${response.data[i].venue.city + ", " + response.data[0].venue.region}
    Event Date: ${moment(response.data[i].datetime).format('LLLL')}
            `
            console.log(currentData)
            }
           }
           

        }
    );
    }
}


function movieIt() {

    if (searchTerm === "") {
        searchTerm = "clue"
    }

    axios.get("http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
        console.log(response)
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

        }
    );

    
}