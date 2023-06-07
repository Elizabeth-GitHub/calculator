const operators = ['+', '-', '*', '/', '='];

const buttonsContainer = document.getElementById('buttons-container');
const operationalButtonsContainer = document.createElement('div');
const displayContainer = document.getElementById('display');
const buttonClear = document.createElement('button');

let isFirstNumber = true;
let isSecondNumber = false;
let number1 = 0;
let number2 = '';
let operator = null;

createButtonsOperators();
createButtonsDigits();

buttonClear.classList.add('button');
buttonClear.textContent = 'CLEAR';

buttonsContainer.appendChild(operationalButtonsContainer);
buttonsContainer.appendChild(buttonClear);

operationalButtonsContainer.addEventListener('click', handleButtonClick);
buttonClear.addEventListener('click', () => {
    [number1, number2, operator] = [0, null, ''];
    displayContainer.textContent = number1;
});

function handleButtonClick(event) {
    const clickedButton = event.target;
    const buttonValue = clickedButton.textContent;
    const isDigit = !isNaN(parseFloat(buttonValue));

    if (isDigit) {
        handleDigitButton(buttonValue);
    } else {
        handleOperatorButton(buttonValue);
    }
}

function addToDisplay(valueToDisplay) {
    displayContainer.textContent += ` ${valueToDisplay}`;
}

function handleDigitButton(digitValue) {
    if (isFirstNumber) {
        number1 = (number1 === 0) ? digitValue : `${number1}${digitValue}`;
        displayContainer.textContent = number1;
    } else {
        isSecondNumber = true;
        number2 += digitValue;
        addToDisplay(number2);
    }
}

function handleOperatorButton(operatorValue) {
    addToDisplay(operatorValue);

    if (!isSecondNumber) {
        isFirstNumber = false;
        operator = operatorValue;
    } else {
        let result = operate(parseFloat(number1), parseFloat(number2), operator);

        displayContainer.textContent = result;
        number1 = result;
        number2 = ''; 
        if (operatorValue !== '=') {
            operator = operatorValue;
            addToDisplay(operatorValue);
        } else {
            isSecondNumber = false;
            operator = null;
        }
    }
}

function createButtonsOperators() {
    for (let i = 0; i < operators.length; i++) {
        const buttonOperator = document.createElement('button');

        buttonOperator.classList.add('button');
        buttonOperator.textContent = operators[i];
        operationalButtonsContainer.appendChild(buttonOperator);
    }
}

function createButtonsDigits() {
    for (let i = 0; i < 10; i++) {
        const buttonDigit = document.createElement('button');

        buttonDigit.classList.add('button');
        buttonDigit.textContent = i;
        operationalButtonsContainer.appendChild(buttonDigit);
    }
}

function operate(element1, element2, symbol) {
    if (symbol === '+') {
        return add(element1, element2);
    } else if (symbol === '-') {
        return subtract(element1, element2);
    } else if (symbol === '*') {
        return multiply(element1, element2);
    } else if (symbol === '/') {
        return divide(element1, element2);
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
