// Group all p1s into an object and all p2s into an object
const p1 = {
    // selecting the same things, just storing them as properties
    // in an object
    score: 0,
    button: document.querySelector('#p1Button'),
    display: document.querySelector('#p1Display')
}
const p2 = {
    // selecting the same things, just storing them as properties
    // in an object
    score: 0,
    button: document.querySelector('#p2Button'),
    display: document.querySelector('#p2Display')
}


// Select the buttons
//const p1Button = document.querySelector('#p1Button');
//const p2Button = document.querySelector('#p2Button');
const resetButton = document.querySelector('#reset');

//const p1Display = document.querySelector('#p1Display');
//const p2Display = document.querySelector('#p2Display');

// select the select options
const winningScoreSelect = document.querySelector('#playto');

// when we click on player 1 button, we want to take p1's current score
// and add 1 to it. Then update p1's span to have that new score
//let p1Score = 0; // score starts at 0
//let p2Score = 0; // score starts at 0
let winningScore = 3; // our game options ranges from 3-11
let isGameOver = false; // keep track of when game ends


// if more than 1 opponent, pass in an array of opponents (player, everyone else)
function updateScore(player, opponent) {
    if (!isGameOver) {
        // when clicked, add 1 to player's score
        player.score += 1;
        if (player.score === winningScore) {
            isGameOver = true; // we found winner
            player.display.classList.add('has-text-success');
            opponent.display.classList.add('has-text-danger');

            // disable when there is a game over
            player.button.disabled = true;
            opponent.button.disabled = true;

        }
        // change the span's text
        player.display.innerText = player.score;
    }
}

p1.button.addEventListener('click', function () {
    updateScore(p1, p2);
})
p2.button.addEventListener('click', function () {
    updateScore(p2, p1);
})


// when reset button is clicked, pass in the reset function
resetButton.addEventListener('click', reset);

// Reset function
function reset() {
    // update the values
    isGameOver = false;
    // only 2 players at the moment

    for (let p of [p1, p2]) {
        p.score = 0;
        // update the display
        p.display.textContent = 0;
        p.display.classList.remove('has-text-success', 'has-text-danger');
        // when we reset, un-disable the buttons
        p.button.disabled = false;
    }
}

// when select event is changed
winningScoreSelect.addEventListener('change', function () {
    // how to get value out? reference this.
    //alert(this.value);
    // it's a string so turn into number
    winningScore = parseInt(this.value);
    // execute reset function
    reset();
})

// run when p1 button is clicked
/* p1Button.addEventListener('click', function () {
    if (!isGameOver) {
        // when clicked, add 1 to p1's score
        p1Score += 1;
        if (p1Score === winningScore) {
            isGameOver = true; // we found winner
            p1Display.classList.add('has-text-success');
            p2Display.classList.add('has-text-danger');

            // disable when there is a game over
            p1Button.disabled = true;
            p2Button.disabled = true;

        }
        // change the span's text
        p1Display.innerText = p1Score;
    }
}) */

/* // player two version
p2Button.addEventListener('click', function () {
    if (!isGameOver) {
        // when clicked, add 1 to p2's score
        p2Score += 1;
        if (p2Score === winningScore) {
            isGameOver = true; // we found winner
            p2Display.classList.add('has-text-success');
            p1Display.classList.add('has-text-danger');

            // disable when there is a game over
            p1Button.disabled = true;
            p2Button.disabled = true;
        }
        // change the span's text
        p2Display.innerText = p2Score;
    }
}) */

/* // Reset function
function reset() {
    // update the values
    isGameOver = false;
    p1Score = 0;
    p2Score = 0;

    // update the display
    p1Display.textContent = 0;
    p2Display.textContent = 0;
    p1Display.classList.remove('has-text-success', 'has-text-danger');
    p2Display.classList.remove('has-text-success', 'has-text-danger');

    // when we reset, un-disable the buttons
    p1Button.disabled = false;
    p2Button.disabled = false;
} */

