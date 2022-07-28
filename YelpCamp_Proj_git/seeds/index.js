const mongoose = require('mongoose');
const Campground = require('../models/campground');
// Import the array to use for rando number
const cities = require('./cities');
// Import arrays from places and descriptors from Seedhelpers
const { places, descriptors } = require('./seedHelpers');


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


// separate function to pick random place and random descriptor & put together
const sample = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

// Remove everything from in the database
const seedDB = async () => {
    await Campground.deleteMany({});
    // Loop 50 times to replace
    for (let i = 0; i < 50; i++) {
        // Generate random # to pick a city in seeds
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10; // $20
        // Make new campground & set location (city, state)
        const camp = new Campground({
            author: '62e1e5c34e5d8508ff22dabf', // YOUR user id from mongo
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            price,
            geometry: {
                type: "Point",
                coordinates: [-113.1331, 47.0202]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dp64ouldx/image/upload/v1658971639/YelpCamp/ephjd6dc2pzmmmpjg3ls.jpg',
                    filename: 'YelpCamp/ephjd6dc2pzmmmpjg3ls'
                  },
                  {
                    url: 'https://res.cloudinary.com/dp64ouldx/image/upload/v1658971639/YelpCamp/flcqonmlg66xsl6nfkqa.jpg',
                    filename: 'YelpCamp/flcqonmlg66xsl6nfkqa'
                  }
              
              
            ]
        })
        await camp.save();

    }
    /*     const c = new Campground({ title: 'purple field' });
        await c.save(); */
}
// Test if it works
// YelpCamp > ls > node seeds/index.js
// Execute our database
seedDB().then(() => {
    mongoose.connection.close(); // close the connection when
    // we are done
});