const express = require('express');  // in order to use it
const app = express();              // execute express
const path = require('path');
const mongoose = require('mongoose');  // Integrate Mongoose (from site)
const methodOverride = require('method-override');

// Require our model
const Product = require('./models/product');

const categories = ['fruit', 'vegetable', 'dairy', 'baked goods'];

// Create a seeds file to seed our db to give it initial data

// Connect to new database
mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true })
    .then(() => {
        console.log('Mongo connection OPEN :)');
    })
    .catch((err => {
        console.log('Uh oh, MONGO CONNECTION error');
        console.log(err);
    }))

// Add Views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));   // tell express to use the middleware
app.use(methodOverride('_method'));

// Add basic route
app.get('/products', async (req, res) => {
    const { category } = req.query;
    if (category) {
        // querying product model
        const products = await Product.find({ category }); // this takes time so make async 
        //console.log(products);
        // pass thru all products (as an obj)
        res.render('products/index.ejs', { products, category });
    } else {
        // to get all products...
        const products = await Product.find({});
        res.render('products/index.ejs', { products, category: 'All' });
    }

})

// /new to serve the form
app.get('/products/new', (req, res) => {
    res.render('products/new', { categories });
})

// Set up route to submit the form
app.post('/products', async (req, res) => {
    //console.log(req.body);
    // Make a new product
    const newProduct = new Product(req.body);
    await newProduct.save();
    //console.log(newProduct);
    // Redirect to show page to see everything we created
    res.redirect(`/products/${newProduct._id}`);
    //res.send('heylo');
})

// Add our product details route using id
app.get('/products/:id', async (req, res) => {
    // Extract an id 
    const { id } = req.params;
    const product = await Product.findById(id);
    console.log(product);
    // Render the template
    res.render('products/show.ejs', { product });


})

// /new to serve the edit form to Update Products
app.get('/products/:id/edit', async (req, res) => {
    // Extract the id
    const { id } = req.params;
    // Look up the product by id 
    const product = await Product.findById(id);
    // and pass it thru
    res.render('products/edit', { product, categories });
})

// Endpoint to submit to (put or patch request)
app.put('/products/:id', async (req, res) => {
    // console.log(req.body); // make sure the info is coming from the form
    // res.send('PUTTTT');
    // Update product using Mongoose
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true }); // send the whole body
    res.redirect(`/products/${product._id}`);
})

// Route to delete a product by id
app.delete('/products/:id', async (req, res) => {
    // Extract the id
    const { id } = req.params;
    // Remove the product from the database
    const deletedProd = await Product.findByIdAndDelete(id);
    // Product removed so send back to index page
    res.redirect('/products');
})

// Listen on port
app.listen(3000, () => {
    console.log("App is listening on port 3000!");
})

