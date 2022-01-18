// This file will be run on its own anytime 
// I need new data in database.
const mongoose = require('mongoose');
// Require our model
const Product = require('./models/product');

// Connect to mongoose
mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true })
    .then(() => {
        console.log('Mongo connection OPEN :)');
    })
    .catch((err => {
        console.log('Uh oh, MONGO CONNECTION error');
        console.log(err);
    }))

/* // Insert one new product
const p = new Product({
    name: 'Ruby Grapefruit',
    price: 1.99,
    category: 'fruit'
})
// Save our product
p.save().then(p => {
    console.log(p);
})
    .catch((err) => {
        console.log(err);
    }) */

const seedProducts = [
    {
        name: 'Fairy Eggplant',
        price: 1.00,
        category: 'vegetable'
    },
    {
        name: 'Organic Melon',
        price: 4.99,
        category: 'fruit'
    },
    {
        name: 'Organic mini seedless watermelon',
        price: 3.99,
        category: 'fruit'
    },
    {
        name: 'Organic choco milk',
        price: 1.20,
        category: 'dairy'
    },
    {
        name: 'Organic celery',
        price: 1.40,
        category: 'vegetable'
    }
]
// Insert several products (array of products )
Product.insertMany(seedProducts)
    .then((response) => {
        console.log(response);
    })
    .catch((err) => {
        console.log(err);
    })