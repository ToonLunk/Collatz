function enterNum() {

    // clear everything already in main AND variables (the last use of the function)
    const main = document.getElementById("main"); // assign main to a variable to append the div
    main.textContent = '';

    let userInput = 0n; // initialize (or re-initialize) the input

    try {
        userInput = BigInt(document.getElementById("numberToCalc").value); // get the number from input
    } catch (error) {
        console.warn("(enterNum()): Error! This is not a (valid) number. Type of input: " + typeof (userInput) +
            " - should be: BigInt. If this says it's a type of BigInt, it's probably NaN.");
        return;
    }
    console.log("(enterNum()): Finished. Current number is: " + userInput);

    if (typeof (userInput) != 'bigint' || userInput <= 0) {
        return;
    }

    console.log("(enterNum()): The type of NUMBER/BIGINT IS: " + typeof (userInput));
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
}

function newNode(counter, phrase) {
    const main = document.getElementById("main"); // assign main to a variable to append the div
    let newDiv = document.createElement("div"); // create a new div
    let newDivText = document.createElement("p"); // create a new paragraph

    // set the text of the p to the counter
    newDivText.innerHTML = (phrase + counter);
    newDiv.appendChild(newDivText);
    newDiv.classList.add("numberNode");
    main.prepend(newDiv);
    console.log("(newNode()): OK, DONE!");
}

function collatz(num) {
    console.log("(collatz()): This will only show once... if not a loop.");
    let counter = 0; // total of how many numbers in this chain
    let lastNum = 0; // to determine if it's larger or smaller than the last number
    let symbol = ""; // to display if the number went up or down
    let largest = 0; // to display the largest number encountered
    while (true) {

        if (num > lastNum) { // if greater than the last number, return a plus symbol
            symbol = "(+)";
        } else {
            symbol = "(-)"; // if less than the last number, return a minus symbol
        }

        if (num > largest) { // checks to see if this new number is larger than the last biggest number
            console.log("(collatz()): Replacing " + largest + " with: " + num + " for the largest number.");
            largest = num;
        }

        counter++;
        lastNum = num; // remember the current number for next time

        createDiv(num, symbol); // create a div with this number and its symbol

        if (num == 1n) {
            console.log("(collatz()): Found a one (1). It's all over!");
            console.log("collatz() Numbers encountered: " + counter);

            newNode(counter, "Nodes in this chain: ");
            newNode(largest, "Largest Number in chain: ");
            return; // if the number is 1, the loop is complete
        };
        if (num % 2n == 1n) { // if the number is odd, perform this operation
            num = ((num * 3n) + 1n)
        } else {
            num /= 2n;
        };
    };
};