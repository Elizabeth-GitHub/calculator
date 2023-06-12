const OPERATORS = ['+', '-', '*', '/', '='];

const containerMain = document.createElement('div');
const containerCalculator = document.createElement('div');
const containerButtons = document.getElementById('buttons-container');
/*const containerOperationalButtons = document.createElement('div');*/
const containerDigitButtons = document.createElement('div');
const containerOperatorButtons = document.createElement('div');
const containerDisplay = document.getElementById('display');
const buttonDecimalPoint = document.createElement('button');
const buttonClear = document.createElement('button');
const buttonDelete = document.createElement('button');
const containerErrorMessage = document.createElement('div');
const errorEqual = document.createElement('p');
const errorZero = document.createElement('p');
const containers = document.querySelectorAll('div');;

let isFirstNumber = true;
let isSecondNumber = false;
let isDecimalPointDisabled = false;
let isError = false;
let number1 = '0';
let number2 = '';
let operator = '';

createButtonsOperators();
createButtonsDigits();

containers.forEach(container => {
    container.classList.add('container');
});
buttonDecimalPoint.classList.add('button');
buttonDecimalPoint.textContent = '.';
buttonClear.classList.add('button');
buttonClear.textContent = 'CLEAR';
buttonDelete.classList.add('button');
buttonDelete.textContent = 'DELETE';
errorEqual.classList.add('hidden');
errorZero.classList.add('hidden');
errorEqual.textContent = 'Incorrect action. Perform a calculation first.'
errorZero.textContent = 'It seems you\'re trying to divide by zero. Division by zero is not allowed in this calculator.\
                        Please choose a non-zero value as the divisor to proceed with the division operation.'

document.body.appendChild(containerMain);
containerMain.appendChild(containerCalculator);
containerCalculator.appendChild(containerButtons);
/*containerButtons.appendChild(containerOperationalButtons);*/
containerButtons.appendChild(containerDigitButtons);
containerButtons.appendChild(containerOperatorButtons);
containerButtons.appendChild(buttonDecimalPoint);
containerButtons.appendChild(buttonClear);
containerButtons.appendChild(buttonDelete);
containerCalculator.appendChild(containerErrorMessage);
containerErrorMessage.appendChild(errorEqual);
containerErrorMessage.appendChild(errorZero);

/*containerOperationalButtons.addEventListener('click', handleButtonClick);*/
containerDigitButtons.addEventListener('click', handleDigitButton);
containerOperatorButtons.addEventListener('click', handleOperatorButton);
buttonDecimalPoint.addEventListener('click', function() {
    const symbolPoint = this.textContent;

    if (isFirstNumber) {
        number1 += symbolPoint;
    } else {
        number2 += symbolPoint;
    }

    addToDisplay(symbolPoint);
    buttonDecimalPoint.classList.add('disabled');
    isDecimalPointDisabled = true;
})
buttonClear.addEventListener('click', () => {
    isSecondNumber = false;
    [number1, number2, operator] = ['0', '', ''];
    containerDisplay.textContent = number1;
    checkDecimalPoint();
    checkErrorMesage();
});
buttonDelete.addEventListener('click', () => {
    const currentDisplayLength = containerDisplay.textContent.length;
    const lastSymbol = containerDisplay.textContent[currentDisplayLength- 1];
    const displayWithoutLastSymbol = containerDisplay.textContent.slice(0, -1);
    const finalDisplay = (currentDisplayLength > 1) ? displayWithoutLastSymbol : 0;

    if (isFirstNumber) {
        number1 = finalDisplay;
    } else if (!checkIfDigit(lastSymbol)) {
        operator = '';
        isFirstNumber = true;
    } else {
        const regex = /\d+$/;
        const symbolsBeforeOperator = displayWithoutLastSymbol.match(regex);

        if (symbolsBeforeOperator) {
            number2 = symbolsBeforeOperator[0]; // digital value of match
        } else {
            isSecondNumber = false;
            number2 = '';
        }
    }

    containerDisplay.textContent = finalDisplay;
})

//
function checkIfDigit(symbolToCheck) {
    return (!isNaN(parseFloat(symbolToCheck)));
}

function hideErrorMessage() {
    Array.from(containerErrorMessage.children).forEach(error=> {
        if (!error.classList.contains('hidden')) {
            error.classList.add('hidden');
        }

        isError = false;
    });
}

function checkErrorMesage() {
    if (isError) {
        hideErrorMessage(); 
    }
}

function addToDisplay(valueToDisplay, gap=false) {
    containerDisplay.textContent += (gap) ? ` ${valueToDisplay} ` :valueToDisplay;
}

function handleDigitButton(event) {
    const digitValue = event.target.textContent;

    if (operator === null && !isSecondNumber) {
        number1 = digitValue;
        containerDisplay.textContent = number1;
        operator = '';
    } else if (isFirstNumber) {
        number1 = (number1 === '0' && digitValue === '0') ? '0' : (number1 === '0' ? digitValue : `${number1}${digitValue}`); 
        containerDisplay.textContent = number1;
    } else {
        isSecondNumber = true;
        if (number2 === '' && digitValue === '0' && operator === '/') {
            showErrorMessage(errorZero);
            return;
        }

        if (number2 === '0') {
            number2 = digitValue;
            containerDisplay.textContent = containerDisplay.textContent.slice(0, length - 2) + digitValue;
        } else {
            number2 += digitValue;
            addToDisplay(digitValue);
        }
    }
}

function showErrorMessage(errorToShow) {
    errorToShow.classList.remove('hidden');
    if (errorToShow === errorZero) {
        Array.from(containerOperatorButtons.children).forEach(buttonOperatorToDisable => {
            buttonOperatorToDisable.classList.add('disabled');
        });
    }
    isError = true;
}

function checkEqualError(operatorToCheck) {
    if (operatorToCheck === '=' && !isSecondNumber) {
        showErrorMessage(errorEqual);
        return true;
    }
}

function enableButton(buttonToEnable) {
    buttonToEnable.classList.remove('disabled');
}

function disableButton(buttonToDisable) {
    buttonToDisable.classList.add('disabled');
}

function checkDecimalPoint() {
    if (isDecimalPointDisabled) {
        enableButton(buttonDecimalPoint);
    }
}

function handleOperatorButton(event) {
    const operatorValue = event.target.textContent;

    if (checkEqualError(operatorValue)) {
        return;
    };

    checkDecimalPoint();
    addToDisplay(operatorValue, gap=true);

    if (!isSecondNumber) {
        isFirstNumber = false;
        operator = operatorValue;
    } else {

        let result = operate(parseFloat(number1), parseFloat(number2), operator);

        containerDisplay.textContent = parseFloat(result.toFixed(5));
        number1 = result;
        if (!Number.isInteger(result)) {
            disableButton(buttonDecimalPoint);
        }

        isFirstNumber = true;
        number2 = ''; 
        if (operatorValue !== '=') {
            operator = operatorValue;
            isFirstNumber = false;
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

        buttonOperator.classList.add('button', 'button-operator');
        buttonOperator.textContent = OPERATORS[i];
        /*containerOperationalButtons.appendChild(buttonOperator);*/
        containerOperatorButtons.appendChild(buttonOperator);
    }
}

function createButtonsDigits() {
    for (let i = 0; i < 10; i++) {
        const buttonDigit = document.createElement('button');

        buttonDigit.classList.add('button');
        buttonDigit.textContent = i;
        /*containerOperationalButtons.appendChild(buttonDigit);*/
        containerDigitButtons.appendChild(buttonDigit);
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
