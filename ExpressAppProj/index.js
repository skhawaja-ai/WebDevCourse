// Objective of app: Get a server up and running

// first require express in order to use it
const express = require('express');

// Execute express and save return value in variable
const app = express();

// When there is an incoming request, the callback runs.
// req and res are objects made by express and passed to callback
/* app.use((request, response) => {
    console.log('We got a new request!');
    //response.send('Hello! We got your request. This is a response.');
    // send a javascript object
    //response.send({ color: 'red' });
    // send html as string
    response.send('<h1>This is my webpage</h1>');
}) */

// Home/Root Route
app.get('/', (request, response) => {
    response.send('This is the home page. :)');
})

// Matches anything that follows the pattern /r/:
app.get('/r/:subreddit', (request, response) => {
    //console.log(request.params); // extract value from params
    const { subreddit } = request.params;
    response.send(`<h1>Browsing the ${subreddit} subreddit</h1>`); // send value back as h1
})

// Multiple parameters.. the colon indicates a variable
app.get('/r/:subreddit/:postId', (request, response) => {
    //console.log(request.params); // extract value from params
    const { subreddit, postId } = request.params;
    response.send(`<h1>Viewing postID: (${postId}) on the ${subreddit} subreddit</h1>`); // send value back as h1
})


// Routing to /cats
app.get('/cats', (request, response) => {
    response.send('MEOW');
})

// Post request to /cats (on postman)
app.post('/cats', (request, response) => {
    response.send('Post request to /cats. This is different than a get() request!'.toUpperCase());
})

// Routing to /dogs
app.get('/dogs', (request, response) => {
    response.send('woof');
})

// Query string
// Multiple key/value pairs separated by &
app.get('/search', (request, response) => {
    // assuming there's a query string called q
    const { q } = request.query;
    if (!q) {
        response.send('Nothing found if nothing searched!');
    } else {
        //console.log(request.query);
        response.send(`<h1>Search Results: ${q}</h1>`);
    }
})

// Must be last otherwise the previous ones will not work (order matters!)
// Gets everything * other than the paths we specified 
app.get('*', (request, response) => {
    response.send(`Uh oh, I don't know that path!`);
})


// To get a server going, start listening
// also running locally
app.listen(3000, () => {
    console.log('Listening on port 3000');
})

// Send request to our newly set up server