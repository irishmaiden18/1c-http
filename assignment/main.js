//everything should be sent as text or an object

//include the http module
const http = require("http")

//allows us to read from files
const fs = require("fs")

// import your data
const jokes = require("./data/jokes")
const albums = require("./data/albums")

// write a getRandom function to get random elements from your arrays inside the helper folder and import it here
const random = require("./helper/index")

// console.log(random(jokes))
// console.log(random (albums))

// set up your routes for jokes, albums, and errors

// allows us to create a server that can send back content to the client
// request - http object that represents incoming data (what you get from the client)
// response - http object that represents outgoing data (what you send back to the client)
const server = http.createServer((request, response) => {

    //if URL typed in by user is "/jokes"
    if (request.url === "/jokes") {
        //get a random joke, this is a string
        let randomJoke = random(jokes)
        //send back the random joke
        response.end(randomJoke)
    //if URL typed in by user is "/albums"    
    } else if (request.url === "/albums") {
        //get a random album, this is an object
        let randomAlbum = random(albums)
        //send back a string of the random album object
        response.end(JSON.stringify(randomAlbum))
    } else {
        // response.end("There had been an error with the requested URL")

        //read the error file and save contents to variable "page", if the user tries to go to a URL that we haven't accounted for above, log an error
        fs.readFile("./error.html", (error, page) => {
            //if everything the requested URL works upon loading
            if(!error) {
                //send back the error page
                response.end(page)
            //if there is an error when trying to load the requested URL    
            } else {
                //send back the text "Error - 404!"
                response.end("Error - 404!")
            }
        })
    }

})

const PORT = 3000

//allow the server to begin listening for requests
server.listen(PORT, () => {
    console.log(`Server is listening on Port: ${PORT}`)
})




