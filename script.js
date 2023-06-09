const OPERATORS = ['+', '-', '*', '/', '='];

const mainContainer = document.createElement('div');
const buttonsContainer = document.getElementById('buttons-container');
const operationalButtonsContainer = document.createElement('div');
const displayContainer = document.getElementById('display');
const buttonDecimalPoint = document.createElement('button');
const buttonClear = document.createElement('button');
const errorMessageContainer = document.createElement('div');
const errorEqual = document.createElement('p');
const errorZero = document.createElement('p');

let isFirstNumber = true;
let isSecondNumber = false;
let isDecimalPointDisabled = false;
let number1 = '0';
let number2 = '';
let operator = '';

createButtonsOperators();
createButtonsDigits();

buttonDecimalPoint.classList.add('button');
buttonDecimalPoint.textContent = '.';
buttonClear.classList.add('button');
buttonClear.textContent = 'CLEAR';
errorEqual.classList.add('hidden');
errorZero.classList.add('hidden');
errorEqual.textContent = 'Incorrect action. Perform a calculation first.'
errorZero.textContent = 'It seems you\'re trying to divide by zero. Division by zero is not allowed in this calculator.\
                        Please choose a non-zero value as the divisor to proceed with the division operation.'

document.body.appendChild(mainContainer);
mainContainer.appendChild(buttonsContainer);
buttonsContainer.appendChild(operationalButtonsContainer);
buttonsContainer.appendChild(buttonDecimalPoint);
buttonsContainer.appendChild(buttonClear);
mainContainer.appendChild(errorMessageContainer);
errorMessageContainer.appendChild(errorEqual);
errorMessageContainer.appendChild(errorZero);

operationalButtonsContainer.addEventListener('click', handleButtonClick);
buttonDecimalPoint.addEventListener('click', function() {
    if (isFirstNumber) {
        number1 += this.textContent;
    } else {
        number2 += this.textContent;
    }
    addToDisplay(this.textContent);
    buttonDecimalPoint.classList.add('disabled');
    isDecimalPointDisabled = true;
})
buttonClear.addEventListener('click', () => {
    isSecondNumber = false;
    [number1, number2, operator] = ['0', '', ''];
    displayContainer.textContent = number1;
    checkDecimalPoint();
});

//
function hideErrorMessage() {
    Array.from(errorMessageContainer.children).forEach(child => {
        if (!child.classList.contains('hidden')) {
            child.classList.add('hidden');
        }
    });
}

function handleButtonClick(event) {
    const buttonValue = event.target.textContent;
    const isDigit = !isNaN(parseFloat(buttonValue));

    hideErrorMessage(); 

    if (isDigit) {
        handleDigitButton(buttonValue);
    } else {
        handleOperatorButton(buttonValue);
    }
}

function addToDisplay(valueToDisplay, gap=false) {
    displayContainer.textContent += (gap) ? ` ${valueToDisplay} ` :valueToDisplay;
}

function handleDigitButton(digitValue) {
    if (operator === null && !isSecondNumber) {
        number1 = digitValue;
        displayContainer.textContent = number1;
        operator = '';
    } else if (isFirstNumber) {
        number1 = (number1 === '0' && digitValue === '0') ? '0' : (number1 === '0' ? digitValue : `${number1}${digitValue}`); 
        displayContainer.textContent = number1;
    } else {
        isSecondNumber = true;
        if (number2 === '' && digitValue === '0' && operator === '/') {
            showErrorMessage(errorZero);
            return;
        }
        number2 += digitValue;
        addToDisplay(digitValue);
    }
}

function showErrorMessage(errorToShow) {
    errorToShow.classList.remove('hidden');
}

function checkErrorMesage(operatorToCheck) {
    if (operatorToCheck === '=' && !isSecondNumber) {
        showErrorMessage(errorEqual);
        return true;
    }
}

function enableButtonDecimalPoint() {
    buttonDecimalPoint.classList.remove('disabled');
}

function checkDecimalPoint() {
    if (isDecimalPointDisabled) {
        enableButtonDecimalPoint()
    }
}

function handleOperatorButton(operatorValue) {
    if (checkErrorMesage(operatorValue)) {
        return;
    };

    checkDecimalPoint();
    addToDisplay(operatorValue, gap=true);

    if (!isSecondNumber) {
        isFirstNumber = false;
        operator = operatorValue;
    } else {

        let result = operate(parseFloat(number1), parseFloat(number2), operator);

        displayContainer.textContent = parseFloat(result.toFixed(5));
        number1 = result;
        isFirstNumber = true;
        number2 = ''; 
        if (operatorValue !== '=') {
            operator = operatorValue;
            addToDisplay(operatorValue, gap=true);
        } else {
            isSecondNumber = false;
            operator = null;
        }
    }
}

function createButtonsOperators() {
    for (let i = 0; i < OPERATORS.length; i++) {
        const buttonOperator = document.createElement('button');

        buttonOperator.classList.add('button');
        buttonOperator.textContent = OPERATORS[i];
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
