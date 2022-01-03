// select our form
const form = document.querySelector('#searchForm');
// select div to append images to instead and remove easier
const container = document.querySelector('#container');

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    // console.dir(form);
    // console.log(form.elements.query.value); // you can view Elements > query > with user inputted value
    const searchTerm = form.elements.query.value;

    // Make API (axios) call
    // base url:  https://api.tvmaze.com/search/shows?q=girls
    // replace q= with whatever the user types
    // every key-value pair in params is added to query string
    const config = { params: { q: searchTerm } }; //we can add headers too
    const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);

    // clear previous search images 
    container.innerText = '';
    makeImages(res.data);

    // reset the input value
    form.elements.query.value = "";
})

const makeImages = (shows) => {
    for (let show of shows) {
        if (show.show.image) { // if image exists
            //for each show, make a new img and set the source
            const img = document.createElement('img');
            // first show is current element, second show is from API
            img.src = show.show.image.medium;
            // append to doc's body
            // document.body.append(img);
            // append images to our container div
            container.append(img);
        }
        // otherwise we ignore it

    }
}

// clear images when we type new input

