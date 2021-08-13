function enterNum() {

    // clear everything already in main AND variables (the last use of the function)
    const main = document.getElementById("main"); // assign main to a variable to append the div
    main.textContent = '';

    let userInput = 0n; // initialize (or re-initialize) the input

    try {
        userInput = BigInt(document.getElementById("numberToCalc").value); // get the number from input
    } catch (error) {
        console.warn("Error! This is not a (valid) number. Type of input: " + typeof (userInput) +
            "Using 7 instead, because why not?");
        console.log("This is not a number. Please use a real number next time. " +
            "Try 7. 7 is a real number.");
        return;
    }
    console.log("enterNum() finished; current number is: " + userInput);

    if (typeof (userInput) != 'bigint' || userInput <= 0) {
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
        newDiv.style.color = "#268EBA";
    } else {
        newDiv.style.color = "#FF8C42";
    }

    newDiv.appendChild(newDivText); // append the p element to the div
    newDiv.appendChild(newDivSymbol); // append the span to the div
    main.appendChild(newDiv); // append the div to the main element

    console.log("createDiv() finished; appended a new div with number: " + num);
}

function updateCounter(counter) {
    const main = document.getElementById("main"); // assign main to a variable to append the div
    let newDiv = document.createElement("div"); // create a new div
    let newDivText = document.createElement("p"); // create a new paragraph

    // set the text of the p to the counter
    newDivText.innerHTML = ("Nodes in this chain: " + counter);
    newDiv.appendChild(newDivText);
    newDiv.classList.add("numberNode");
    main.prepend(newDiv);
    console.log("OK");
}

function collatz(num) {
    console.log("This will only show once... if not a loop.");
    let counter = 0; // total of how many numbers in this chain
    let lastNum = 0; // to determine if it's larger or smaller than the last number
    let symbol = ""; // to display if the number went up or down
    while (true) {

        if (num > lastNum) { // if greater than the last number, return a plus symbol
            symbol = "(+)";
        } else {
            symbol = "(-)"; // if less than the last number, return a minus symbol
        }

        counter++;
        console.log("Numbers crossed: " + counter);
        lastNum = num;

        createDiv(num, symbol); // create a div with this number and its symbol

        if (num == 1n) {
            console.log("Found a one (1). It's all over!");
            updateCounter(counter)
            return; // if the number is 1, the loop is complete
        };
        if (num % 2n == 1n) { // if the number is odd, perform this operation
            num = ((num * 3n) + 1n)
        } else {
            num /= 2n;
        };
    };
};