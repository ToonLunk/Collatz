function enterNum() {

    // clear everything already in main AND variables (the last use of the function)
    const main = document.getElementById("main"); // assign main to a variable to append the div
    main.textContent = '';

    //test
    let userInput = 0; // initialize (or re-initialize) the input
    userInput = parseInt(document.getElementById("numberToCalc").value); // get the number from input
    console.log("enterNum() finished; current number is: " + userInput);

    if (typeof (userInput) != 'number' || isNaN(userInput)) {
        console.warn("Error! This is not a (valid) number. Type of input: " + typeof (userInput) +
            "Using 7 instead, because why not?");
        window.alert("This is not a number. Please use a real number next time. For now, try 7. 7 is a real number.");
        collatz(7);
        return;
    }

    console.log("Alright, here we go! the type of NUMBER IS: " + typeof (userInput));
    collatz(userInput); // run the number through createDiv()
}

function createDiv(num, symbol) {
    const main = document.getElementById("main"); // assign main to a variable to append the div
    let newDiv = document.createElement("div"); // create a new div
    let newDivText = document.createElement("p"); // create a new paragraph
    let newDivSymbol = document.createElement("span"); // create a new span for the symbol

    newDiv.classList.add("numberNode"); // give the new div a class

    num = num.toLocaleString('en'); // add commas and separators to the number
    newDivText.innerHTML = (num); // set the text of the p to num
    newDivSymbol.innerHTML = (symbol); // set the text of the span to the symbol

    // check if the symbol is + or - and change the color accordingly
    if (symbol == "(+)") {
        newDiv.style.color = "#9295DD";
    } else {
        newDiv.style.color = "#FF3333";
    }

    newDiv.appendChild(newDivText); // append the p element to the div
    newDiv.appendChild(newDivSymbol); // append the span to the div
    main.appendChild(newDiv); // append the div to the main element

    console.log("createDiv() finished; appended a new div with number: " + num);
}

function collatz(num) {
    console.log("This will only show once... if not a loop.");
    let lastNum = 0; // to determine if it's larger or smaller than the last number
    let symbol = "";
    while (true) {

        if (num > lastNum) {
            symbol = "(+)";
        } else {
            symbol = "(-)";
        }
        lastNum = num;

        createDiv(num, symbol);

        if (num == 1) {
            console.log("Found a one (1). It's all over!");
            return; // if the number is 1, the loop is complete
        };
        if (num % 2 == 1) { // if the number is odd, perform this operation
            num = ((num * 3) + 1)
        } else {
            num /= 2;
        };
    };
};