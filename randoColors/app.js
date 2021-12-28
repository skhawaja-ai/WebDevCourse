// run code when button is clicked, so select button
const btn = document.querySelector('#clickme');

// select and update the h1 to have new text
const h1 = document.querySelector('h1');

// when we click the button
btn.addEventListener('click', function () {
    // Execute randomColor and save to variable
    const newColor = randomColor();

    // set bg color to be the new color we made from rando nums
    document.body.style.backgroundColor = newColor;

    // overwrite the h1
    h1.innerText = newColor;
})

// const randomColor = () =>{
//}
function randomColor() {
    // Generate a random color
    // Set the body to that random color

    // Simplified ver of changing the bg color of the body to a color
    // document.body.style.backgroundColor = 'olive';

    // rgb (0-255, 0-255, 0-255)
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    // create/returnn the new rgb() out of our new rando nums
    return `rgb(${r},${g},${b})`;

}