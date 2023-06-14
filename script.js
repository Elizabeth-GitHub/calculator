const OPERATORS = ['+', '-', '*', '/', '='];

const containerMain = document.createElement('div');
const containerCalculator = document.createElement('div');
const containerButtons = document.getElementById('buttons-container');
const containerUpperButtons = document.createElement('div');
const containerLowerButtons = document.createElement('div'); 
const containerDigitButtons = document.createElement('div');
const containerOperatorButtons = document.createElement('div');
const containerDisplay = document.getElementById('display');
const buttonDecimalPoint = document.createElement('button');
const buttonEqual = document.createElement('button');
const buttonClear = document.createElement('button');
const buttonDelete = document.createElement('button');
const containerErrorMessage = document.createElement('div');
const errorEqual = document.createElement('p');
const errorZero = document.createElement('p');
const containers = [
    containerMain,
    containerCalculator,
    containerButtons,
    containerUpperButtons,
    containerLowerButtons,
    containerDigitButtons,
    containerOperatorButtons,
    containerErrorMessage
  ];
  

let isFirstNumber = true;
let isOperator = false;
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
containerMain.setAttribute('id', 'container-main');
containerDisplay.classList.add('container');
containerCalculator.setAttribute('id', 'container-calculator');
containerUpperButtons.setAttribute('id', 'container-upperbuttons');
containerLowerButtons.setAttribute('id', 'container-lowerbuttons');
containerDigitButtons.setAttribute('id', 'container-digitbuttons');
buttonDecimalPoint.setAttribute('id', 'button-decimalpoint');
buttonDecimalPoint.classList.add('button');
buttonDecimalPoint.textContent = '.';
buttonEqual.setAttribute('id', 'button-equal');
buttonEqual.classList.add('button');
buttonEqual.textContent = '=';
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
containerCalculator.appendChild(containerDisplay);
containerCalculator.appendChild(containerButtons);
containerButtons.appendChild(containerUpperButtons);
containerUpperButtons.appendChild(buttonClear);
containerUpperButtons.appendChild(buttonDelete);
containerButtons.appendChild(containerLowerButtons);
containerLowerButtons.appendChild(containerDigitButtons);
containerLowerButtons.appendChild(containerOperatorButtons);
containerCalculator.appendChild(containerErrorMessage);
containerErrorMessage.appendChild(errorEqual);
containerErrorMessage.appendChild(errorZero);

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
    disableButton(buttonDecimalPoint);
    isDecimalPointDisabled = true;
})
buttonClear.addEventListener('click', () => {
    isSecondNumber = false;
    [number1, number2, operator] = ['0', '', ''];
    containerDisplay.textContent = number1;
    checkDecimalPoint();
    checkErrorMesage();
});
buttonDelete.addEventListener('click', deleteLastSymbol);

//
function deleteLastSymbol() {
    const currentDisplayLength = containerDisplay.textContent.length;
    const lastSymbol = containerDisplay.textContent[currentDisplayLength- 1];
    const displayWithoutLastSymbol = containerDisplay.textContent.slice(0, -1);
    const finalDisplay = (currentDisplayLength > 1) ? displayWithoutLastSymbol : 0;

    if (isFirstNumber) {
        number1 = finalDisplay;
    } else if (!checkIfDigit(lastSymbol)) {
        operator = '';
        isFirstNumber = true;
        containerDisplay.textContent = containerDisplay.textContent.slice(0, currentDisplayLength - 2);
        return;
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
}

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

    if (operator === '=' && !isSecondNumber) {
        number1 = digitValue;
        containerDisplay.textContent = number1;
        operator = '';
    } else if (isFirstNumber) {
        number1 = (number1 === '0' && digitValue === '0') ? '0' : (number1 === '0' ? digitValue : `${number1}${digitValue}`); 
        containerDisplay.textContent = number1;
    } else {
        isSecondNumber = true;
        isOperator = false;
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
        isDecimalPointDisabled = false;
    }
}

function handleOperatorButton(event) {
    const operatorValue = event.target.textContent;

    if (checkEqualError(operatorValue)) {
        return;
    };

    checkDecimalPoint();
    if (operatorValue !== '=') {
        if (!isOperator) {
            addToDisplay(operatorValue, gap=true);
            isOperator = true;
        } else {
        deleteLastSymbol();
        addToDisplay(operatorValue, gap=true);
        }
    }

    if (!isSecondNumber) {
        isFirstNumber = false;
        operator = operatorValue;
    } else {
        let result = operate(parseFloat(number1), parseFloat(number2), operator);

        containerDisplay.textContent = parseFloat(result.toFixed(5));
        
        number1 = result;
        operator = operatorValue;
        number2 = ''; 

        if (!Number.isInteger(result)) {
            disableButton(buttonDecimalPoint);
            isDecimalPointDisabled = true;
        }
        
        if (operator !== '=') { 
            addToDisplay(operator, gap=true);
        } else {
            isFirstNumber = true;
            isSecondNumber = false;
        }
    }
}

function createButtonsOperators() {
    
    for (let i = 1; i < OPERATORS.length; i++) {
        const buttonOperator = document.createElement('button');

        buttonOperator.classList.add('button', 'button-operator');
        buttonOperator.textContent = OPERATORS[i];
        containerOperatorButtons.appendChild(buttonOperator);
    }
}

function createButtonsDigits() {  
    containerDigitButtons.appendChild(buttonDecimalPoint);

    const buttonZero = document.createElement('button');

    buttonZero.classList.add('button');
    buttonZero.textContent = '0';
    containerDigitButtons.appendChild(buttonZero);

    containerDigitButtons.appendChild(buttonEqual);

   for (let i = 1; i < 10; i++) {
    const buttonDigit = document.createElement('button');

    buttonDigit.classList.add('button', 'button-digits');
    buttonDigit.textContent = i;
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
