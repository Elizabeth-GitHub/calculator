const OPERATORS = ['+', '-', '*', '/'];

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
let isEqualError = false;
let isZeroError = false;
let isResult = false;
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
containerDisplay.setAttribute('id', 'container-display');
containerUpperButtons.setAttribute('id', 'container-upperbuttons');
containerLowerButtons.setAttribute('id', 'container-lowerbuttons');
containerDigitButtons.setAttribute('id', 'container-digitbuttons');
containerOperatorButtons.setAttribute('id', 'container-operatorbuttons');
buttonDecimalPoint.setAttribute('id', 'button-decimalpoint');
buttonDecimalPoint.classList.add('button');
buttonDecimalPoint.textContent = '.';
buttonEqual.setAttribute('id', 'button-equal');
buttonEqual.classList.add('button');
buttonEqual.textContent = '=';
buttonClear.classList.add('button', 'upper-button');
buttonClear.textContent = 'CLEAR';
buttonDelete.classList.add('button', 'upper-button');
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
//
containerButtons.addEventListener('click', (event) => {
    if (isEqualError && event.target.textContent !== '=') {
        hideErrorMessage(errorEqual);
    }
})
containerDigitButtons.addEventListener('click', function(event) {
    const clickedButton = event.target;

    if (clickedButton.classList.contains('button-digits')) {
      handleDigitButton(clickedButton);
    } else if (clickedButton === buttonDecimalPoint) {
        handleDecimalPointButton();
    } else {
        handleEqualSign();
    }
});
containerOperatorButtons.addEventListener('click', handleOperatorButton);

buttonClear.addEventListener('click', () => {
    isSecondNumber = false;
    [number1, number2, operator] = ['0', '', ''];
    containerDisplay.textContent = number1;
    checkDecimalPoint();
});
buttonDelete.addEventListener('click', deleteLastSymbol);
//
function shiftFromFirstToOperator() {
    isFirstNumber = false;
    isOperator = true;
}

function getResult(isAfterEqualClick=true) {  // isAfterEqualClick = true when we enter the function after the clicking '=', false after clicking any other operator.
    let result = operate(parseFloat(number1), parseFloat(number2), operator);

    containerDisplay.textContent = parseFloat(result.toFixed(5));
    
    number1 = result;
    isResult = true;
    number2 = ''; 
    isSecondNumber = false;

    if (isAfterEqualClick) {
        isFirstNumber = true;
        isOperator = false;
    } else {
        shiftFromFirstToOperator();
    }

    if (!Number.isInteger(result)) {
        disableButton(buttonDecimalPoint);
        isDecimalPointDisabled = true;
    }    
}

function handleEqualSign(){
    if (!isSecondNumber) {
        showErrorMessage(errorEqual);
        isEqualError = true;
        return;
    }

    getResult();
}

function handleDecimalPointButton() {
    const symbolPoint = buttonDecimalPoint.textContent;

    if (isFirstNumber) {
        number1 += symbolPoint;
    } else {
        number2 += symbolPoint;
    }

    addToDisplay(symbolPoint);
    disableButton(buttonDecimalPoint);
    isDecimalPointDisabled = true;
}

function deleteLastSymbol() {
    const currentDisplayLength = containerDisplay.textContent.length;
    const lastSymbol = containerDisplay.textContent[currentDisplayLength- 1];
    const displayWithoutLastSymbol = containerDisplay.textContent.slice(0, -1);
    const finalDisplay = (currentDisplayLength > 1) ? displayWithoutLastSymbol : 0;

    if (isFirstNumber) {
        number1 = finalDisplay;

        if (lastSymbol === '.') {
            enableButton(buttonDecimalPoint);
        }
    } else if (isZeroError) {
        containerDisplay.textContent = containerDisplay.textContent.slice(0, currentDisplayLength - 1);
        return;
    } else if (!checkIfDigit(lastSymbol)) {
        operator = '';
        isFirstNumber = true;
        containerDisplay.textContent = containerDisplay.textContent.slice(0, currentDisplayLength - 2);
        return;
    } else {
        const regex = /\d+$/;
        const symbolsBeforeOperator = displayWithoutLastSymbol.match(regex);

        if (symbolsBeforeOperator) {
            number2 = symbolsBeforeOperator[0]; // Digital value of match
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

function hideErrorMessage(errorToHide) {
    errorToHide.classList.add('hidden');

    if (errorToHide === errorZero) {
        enableButton(buttonEqual, isEnableOperators=true);
        isZeroError = false;
    } else {
        isEqualError = false;
    }
    
}

function addToDisplay(valueToDisplay, gap=false) {
    containerDisplay.textContent += (gap) ? ` ${valueToDisplay} ` :valueToDisplay;
}

function handleDigitButton(clickedDigit) {
    const digitValue = clickedDigit.textContent;

    if (isFirstNumber) {  // Working with the first number
        if (number1 === '0') {
            if (digitValue !== '0') {
                number1 = digitValue;
                containerDisplay.textContent = number1;
            }
        } else if (isResult) {
            number1 = digitValue;
            containerDisplay.textContent = number1;
            isResult = false;
        } else {
            number1 += digitValue;
            addToDisplay(digitValue);
        }
    } else if (isOperator && !isSecondNumber) { // Start of the second number
        isOperator = false;
        isSecondNumber = true;
        addToDisplay(digitValue);
        number2 = digitValue;

        if (digitValue === '0' && operator === '/') {
            showErrorMessage(errorZero);
            isZeroError = true;
            return;
        }    
    } else  {  // Continue the second number
        if (number2 === '0') {
            number2 = digitValue;
            deleteLastSymbol();
            hideErrorMessage(errorZero);
            enableButton(buttonEqual, isEnableOperators=true);
        } else {
            if (number2 === '0.') {
                enableButton(buttonEqual, isEnableOperators=true, );
            }

            number2 += digitValue;
        }  

        addToDisplay(digitValue);
    }
} 

function showErrorMessage(errorToShow) {
    errorToShow.classList.remove('hidden');

    if (errorToShow === errorZero) {
        disableButton(buttonEqual, isDisableOperators=true);
}
}

function enableButton(buttonToEnable, isEnableOperators=false) {
    if (isEnableOperators) {
        Array.from(containerOperatorButtons.children).forEach(buttonOperatorToEnable => {
            buttonOperatorToEnable.disabled = false;
        });
    }

    buttonToEnable.disabled = false;
}

function disableButton(buttonToDisable, isDisableOperators=false) {
    if (isDisableOperators) {
        Array.from(containerOperatorButtons.children).forEach(buttonOperatorToDisable => {
            buttonOperatorToDisable.disabled = true;
        });
    }

    buttonToDisable.disabled = true;
}

function checkDecimalPoint() {
    if (isDecimalPointDisabled) {
        enableButton(buttonDecimalPoint);
        isDecimalPointDisabled = false;
    }
}

function handleOperatorButton(event) {
    const operatorValue = event.target.textContent;

    if (isOperator) { // Display and use the last operator if the user has clicked more than one in a row
        deleteLastSymbol();
    }

    checkDecimalPoint();

    if (!isSecondNumber) {
        shiftFromFirstToOperator();   
    } else {
        getResult(isAfterEqualClick=false);
    }

    addToDisplay(operatorValue, gap=true)

    operator = operatorValue;  
}

function createButtonsOperators() {
    
    for (let i = 0; i < OPERATORS.length; i++) {
        const buttonOperator = document.createElement('button');

        buttonOperator.classList.add('button', 'button-operator');
        buttonOperator.textContent = OPERATORS[i];
        containerOperatorButtons.appendChild(buttonOperator);
    }
}

function createButtonsDigits() {  
    containerDigitButtons.appendChild(buttonDecimalPoint);

    const buttonZero = document.createElement('button');

    buttonZero.classList.add('button', 'button-digits');
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
