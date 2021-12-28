let input = prompt('Enter your choice: ');

//add items to begin with (initialize the array)
const todos = ['Make tea', 'Cook dinner'];
//continue to ask user while user has not chosen quit
while (input !== 'q' && input !== 'quit') {

    if (input === 'list') {
        console.log('----------------');
        for (let i = 0; i < todos.length; i++) {
            //print each item contained in list
            console.log(`${i}: ${todos[i]}`);
        }

        console.log('----------------');
    }
    else if (input === 'new') {
        const newtoDo = prompt('What would you like to add?');
        //push new item to end of list
        todos.push(newtoDo);
        console.log(`${newtoDo} added to list.`);
    }
    else if (input === 'delete') {
        // Turn prompt (a string) into a number
        const index = parseInt(prompt('Enter index of item to delete'));
        //console.log(index);
        //check to make sure user entered a valid index
        if (index <= todos.length && index >= 0) {
            //check if the index entered by user, when we convert it is a number, 
            // we will delete from to-do list
            if (!Number.isNaN(index)) {
                // Remove element at the specified index
                const deleted = todos.splice(index, 1); //1 for one item to delete
                console.log(`${deleted[0]} has been removed.`); //deleted is an array so use index of 0
            }
            else {
                console.log('Index unknown');
            }
        }
        else {
            console.log('Not a valid index.');
        }
    }
    //keep asking
    input = prompt('Enter your choice: ');

}
// if you want to exit
while (input == 'quit') {
    console.log('You QUIT.');
    break;
}
// OR
//console.log('you have quit');