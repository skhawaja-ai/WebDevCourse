//check to make sure user enters an integer
let max = parseInt(prompt("Enter maximum number: "));
//while maximum is falsey (not a valid value)
while (!max) {
    //keep asking for a valid num
    max = parseInt(prompt("Enter a valid number: "));
}

// OUR chosen number (randomly generated)
const targetNum = Math.floor(Math.random() * max) + 1;
//view our targetNum
console.log(targetNum);

// now enter a guess
// as long as the guess is incorrect, we will say it's too high/low
//remember to parse as int for numbers only 
let guess = parseInt(prompt("Enter guess: "));

// record number of attempts
let attempts = 1;
while (guess != targetNum) {
    // if max num too big, quit early
    if (guess === -1) {
        break;
    }
    attempts = attempts + 1; // increment the attempt since did not guess right on first try
    if (guess > targetNum) {
        //update guess variable
        guess = parseInt(prompt("Too high. Enter new guess: "));
    }
    else {
        //update guess variable
        guess = parseInt(prompt("Too low. Enter new guess: "));
    }
}

// if quit game
if (guess === -1) {
    // attempts - 1 because incrementing above (after break statement...)
    console.log(`You have quit the game.You have guessed ${attempts - 1} time(s)`);
}
else {
    //print out winning statement
    console.log(`You WIN! You have guessed ${attempts} time(s)!`);
}

