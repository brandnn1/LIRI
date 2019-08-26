Overview
LIRI, like SIRI is an . The difference is that while SIRI uses Sound to , LIRI uses language. Functionally LIRI is a command line level node application. It utilizes axios to interact with and retrieve date from the following API's: Spotify, OMDB and Bands In Town

Below are examples of how you would interact with this application. Note: do not enter the <> characters when specifying any of the particulars.


-Bands In Town-

node liri.js concert-this <band/artist name>

![Concert Capture](/images/ConcertCapture.PNG)
Format: ![Concert Call]

-Spotify-

node liri.js spotify-this-song <song title>

![GitHub Logo](/images/SpotifyCapture.PNG)
Format: ![Spotify Call]

-OMDB- 

node liri.js movie-this <movie name>

![GitHub Logo](/images/MovieCapture.PNG)
Format: ![Movie Call]

Additionally this application supports making API calls directly from a text file. The first input in the file will be the api you want to call (in it's above naming convention) and the second input will be your search parameters. Currently the file is configured to make a spotify call

node liri.js do-what-it-says

![GitHub Logo](/images/SimonSaysCapture.PNG)
Format: ![Do What I Say Text]