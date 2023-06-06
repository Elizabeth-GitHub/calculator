const operators = ['+', '-', '*', '/', '='];

const buttonsContainer = document.getElementById('buttons-container');
const displayContainer = document.getElementById('display');
const buttonClear = document.createElement('button');

let isDisplayZero = true;
let number1 = null;
let number2 = null;
let operator = null;

createButtonsOperators();
createButtonsDigits();

buttonClear.classList.add('button');
buttonClear.textContent = 'CLEAR';
buttonsContainer.appendChild(buttonClear);

buttonsContainer.addEventListener('click', function(event) {
    const clickedButton = event.target;
    const buttonValue = clickedButton.textContent;

    /*if (isDisplayZero && button) {
        displayContainer.textContent = buttonValue;
        isDisplayZero = false;
        number1 = parseFloat(buttonValue);
    } else {
        displayContainer.textContent += buttonValue;
        if (operator === null) {
            number1 = parseFloat(displayContainer.textContent);
        } else {
            number2 = parseFloat(displayContainer.textContent);
        }
    }
});*/

function createButtonsOperators() {
    for (let i = 0; i < operators.length; i++) {
        const buttonOperator = document.createElement('button');

        buttonOperator.classList.add('button');
        buttonOperator.textContent = operators[i];
        buttonsContainer.appendChild(buttonOperator);
    }
}

function createButtonsDigits() {
    for (let i = 0; i < 10; i++) {
        const buttonDigit = document.createElement('button');

        buttonDigit.classList.add('button');
        buttonDigit.textContent = i;
        buttonsContainer.appendChild(buttonDigit);
    }
}

function operate(element1, element2, symbol) {
    if (symbol === '+') {
        add(element1, element2);
    } else if (symbol === '-') {
        subtract(element1, element2);
    } else if (symbol === '*') {
        multiply(element1, element2);
    } else if (symbol === '/') {
        divide(element1, element2);
    }
}

function add(addend1, addend2) {
    return addend1 + addend2;
}

function  subtract(minuend, subtrahend) {
    return minuend - subtrahend;
}

function multiply(factor1, factor2) {
    return factor1 * factor2;
}

function divide(dividend, divisor) {
    return dividend / divisor;
}

console.log(add(2, 3));
console.log(subtract(10, 2));
console.log(multiply(10, 5));
console.log(divide(30, 4));