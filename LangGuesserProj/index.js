// From franc/langs docs; use this instead 
// since require() did not work
import { franc } from 'franc'
import langs from 'langs'
import colors from 'colors'

// require package to use it
//const franc = require("franc");
const input = process.argv[2]; // take argument input, pass it to franc, get language code out
//const colors = require("colors"); // change color of text
//const langs = require("langs"); // turning franc code into language name


// how to use franc: it's a function we now required
// pass user input into franc to get a code
const code = franc(input)

// in docs if lang code = und it throws error
if (code === 'und') {
    console.log("Error, input too short".red);
} else {
    // 3 stands for ISO code (in franc docs), pass in whatever we got back from franc()
    const language = langs.where("3", code);

    console.log(`${language.name}`.blue); //print out name of the language
}

