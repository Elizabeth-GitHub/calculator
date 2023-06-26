const OPERATORS = {
    PLUS: '+',
    MINUS: '-',
    MULTIPLICATION: '*',
    DIVISION: '/'
}
const SYMBOLS = {
    DOT: '.',
    BACKSPACE: 'Backspace',
    ESCAPE: 'Escape',
    EQUAL: '=',
    ENTER: 'Enter'
};
const ZERO = '0';
const EMPTY = '';
const GAP = ' ';

const containerMain = document.createElement('div');
const containerHeader = document.createElement('div');
const textHeader = document.createElement('h1');
const containerCalculator = document.createElement('div');
const containerContent = document.createElement('div');
const containerButtons = document.getElementById('buttons-container');
const containerUpperButtons = document.createElement('div');
const containerLowerButtons = document.createElement('div'); 
const containerDigitButtons = document.createElement('div');
const containerOperatorButtons = document.createElement('div');
const containerDisplay = document.getElementById('display');
const containerFooter = document.createElement('div');
const buttonDecimalPoint = document.createElement('button');
const buttonEqual = document.createElement('button');
const buttonClear = document.createElement('button');
const buttonDelete = document.createElement('button');
const containerErrorMessage = document.createElement('div');
const errorEqual = document.createElement('p');
const errorZero = document.createElement('p');
const creator = document.createElement('p');
const linkCreator = document.createElement('a');
const containerIconCredit = document.createElement('div');
const linkIcon = document.createElement('a');
const linkAuthor = document.createElement('a');
const linkFlaticon = document.createElement('a');
const iconCreditTextNode = document.createTextNode(' and used under the Flaticon Free License');
const containers = [
    containerMain,
    containerHeader,
    containerCalculator,
    containerContent,
    containerDisplay,
    containerButtons,
    containerUpperButtons,
    containerLowerButtons,
    containerDigitButtons,
    containerOperatorButtons,
    containerErrorMessage,
    containerFooter,
    containerIconCredit
  ];

let isFirstNumber = true;
let isOperator = false;
let isSecondNumber = false;
let isDecimalPointDisabled = false;
let isEqualError = false;
let isZeroError = false;
let isResult = false;
let areOperatorsDisabled = false;
let number1;
let number2;
let operator;

containers.forEach(container => {
    container.classList.add('container');
});
containerMain.setAttribute('id', 'container-main');
containerHeader.setAttribute('id', 'container-header');
textHeader.textContent = 'CALCULATOR';
containerCalculator.setAttribute('id', 'container-calculator');
containerContent.setAttribute('id', 'container-content');
containerDisplay.setAttribute('id', 'container-display');
containerUpperButtons.setAttribute('id', 'container-upperbuttons');
containerLowerButtons.setAttribute('id', 'container-lowerbuttons');
containerDigitButtons.setAttribute('id', 'container-digitbuttons');
containerOperatorButtons.setAttribute('id', 'container-operatorbuttons');
containerErrorMessage.setAttribute('id', 'container-errormessage');
containerFooter.setAttribute('id', 'container-footer');
creator.setAttribute('id', 'creator');
containerIconCredit.setAttribute('id', 'container-iconcredit');
buttonDecimalPoint.setAttribute('id', 'button-decimalpoint');
buttonDecimalPoint.classList.add('button');
buttonDecimalPoint.textContent = SYMBOLS.DOT;
buttonEqual.setAttribute('id', 'button-equal');
buttonEqual.classList.add('button');
buttonEqual.textContent = SYMBOLS.EQUAL;
buttonClear.classList.add('button', 'upper-button');
buttonClear.textContent = 'CLEAR';
buttonDelete.classList.add('button', 'upper-button');
buttonDelete.textContent = 'DELETE';
errorEqual.classList.add('hidden');
errorZero.classList.add('hidden');
errorEqual.textContent = 'Incorrect action. Perform a calculation first.'
errorZero.innerHTML = 'It seems you\'re trying to divide by zero.<br>' +
                      'Division by zero is not allowed in this calculator!<br>' +
                      'Please choose a non-zero value as the divisor to proceed with the division operation.';
containerFooter.setAttribute('id', 'container-footer');
creator.innerText = 'Created by ';
linkCreator.classList.add('text-footer');
linkCreator.href = 'https://github.com/Elizabeth-GitHub';
linkCreator.target = '_blank';
linkCreator.innerText = 'Elizabeth Developer';
containerIconCredit.style.whiteSpace = 'nowrap';
linkIcon.href = 'https://www.flaticon.com/free-icon/calculator_9461186?term=calculator&page=1&position=32&origin=search&related_id=9461186';
linkIcon.target = '_blank';
linkIcon.textContent = 'Calculator icon';
linkAuthor.href = 'https://www.flaticon.com/authors/vectorslab';
linkAuthor.target = '_blank';
linkAuthor.textContent = 'Vectorslab';
linkFlaticon.href = 'https://www.flaticon.com/';
linkFlaticon.target = '_blank';
linkFlaticon.textContent = 'Flaticon';                   

document.body.appendChild(containerMain);
containerMain.appendChild(containerHeader);
containerHeader.appendChild(textHeader);
containerMain.appendChild(containerCalculator);
containerCalculator.appendChild(containerContent);
containerContent.appendChild(containerDisplay);
containerContent.appendChild(containerButtons);
containerButtons.appendChild(containerUpperButtons);
containerUpperButtons.appendChild(buttonClear);
containerUpperButtons.appendChild(buttonDelete);
containerButtons.appendChild(containerLowerButtons);
containerLowerButtons.appendChild(containerDigitButtons);
containerLowerButtons.appendChild(containerOperatorButtons);
containerCalculator.appendChild(containerErrorMessage);
containerErrorMessage.appendChild(errorEqual);
containerErrorMessage.appendChild(errorZero);
containerMain.appendChild(containerFooter);
containerFooter.appendChild(creator);
creator.appendChild(linkCreator);
containerFooter.appendChild(containerIconCredit);
containerIconCredit.appendChild(linkIcon);
containerIconCredit.appendChild(document.createTextNode(' was made by '));
containerIconCredit.appendChild(linkAuthor);
containerIconCredit.appendChild(document.createTextNode(' from '));
containerIconCredit.appendChild(linkFlaticon);
containerIconCredit.appendChild(iconCreditTextNode);

createButtonsOperators();
createButtonsDigits();
setDefaultValues();
addEventListeners();
//

function createButtonsOperators() {
    const keys = Object.keys(OPERATORS);
    
    for (let i = 0; i < keys.length; i++) {
        const buttonOperator = document.createElement('button');

        buttonOperator.classList.add('button', 'button-operator');
        buttonOperator.textContent = OPERATORS[keys[i]];
        containerOperatorButtons.appendChild(buttonOperator);
    }
}

function createButtonsDigits() {  
    containerDigitButtons.appendChild(buttonDecimalPoint);

    const buttonZero = document.createElement('button');

    buttonZero.classList.add('button', 'button-digit');
    buttonZero.textContent = ZERO;
    containerDigitButtons.appendChild(buttonZero);
    containerDigitButtons.appendChild(buttonEqual);

   for (let i = 1; i < 10; i++) {
    const buttonDigit = document.createElement('button');

    buttonDigit.classList.add('button', 'button-digit');
    buttonDigit.textContent = i;
    containerDigitButtons.appendChild(buttonDigit);
    }  
}

function setDefaultValues() {
    [number1, number2, operator] = [ZERO, EMPTY, EMPTY];
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

function operate(element1, element2, symbol) {
    if (symbol === OPERATORS.PLUS) {
        return add(element1, element2);
    } else if (symbol === OPERATORS.MINUS) {
        return subtract(element1, element2);
    } else if (symbol === OPERATORS.MULTIPLICATION) {
        return multiply(element1, element2);
    } else if (symbol === OPERATORS.DIVISION) {
        return divide(element1, element2);
    }
}

function addToDisplay(valueToDisplay, gap=false) {
    containerDisplay.textContent += (gap) ? ` ${valueToDisplay} ` :valueToDisplay;
}

function checkIfZero(valueToCheck) {
    return valueToCheck === ZERO;
}

function replaceNumber(numberToReplace) { // numberToReplace: 'firstNumber' or 'secondNumber'
    if (numberToReplace === 'firstNumber') {
        containerDisplay.textContent = number1;
    } else if (numberToReplace === 'secondNumber'){
        containerDisplay.textContent = containerDisplay.textContent.slice(0, -1) + number2;
    }
}

function preventDoubleZero(whichNumber, newValue) { // whichNumber: 'first' or 'second'
    if (!checkIfZero(newValue)) {
        if (whichNumber === 'first') {
            number1 = newValue;
            replaceNumber('firstNumber');
        } else {
            number2 = newValue;
            replaceNumber('secondNumber');
        }
    }
}

function disableIsResultIfActive() {
    if (isResult) {
        isResult = false;
    }
}

function handleFirstNumber(newValueForFirstNumber) {
    const isFirstNumberZero = checkIfZero(number1);

    if (isFirstNumberZero) {
        preventDoubleZero('first', newValueForFirstNumber);
    } else if (isResult) {
        number1 = newValueForFirstNumber;

        replaceNumber('firstNumber');
        disableIsResultIfActive();
    } else {
        number1 = add(number1, newValueForFirstNumber);
        addToDisplay(newValueForFirstNumber);
    }
}
///
function enableOperators() {
    Array.from(containerOperatorButtons.children).forEach(buttonOperatorToEnable => {
        buttonOperatorToEnable.disabled = false;
    });

    areOperatorsDisabled = false;
}

function enableButton(buttonToEnable) {
    buttonToEnable.disabled = false;

    if (buttonToEnable === buttonDecimalPoint) {
        isDecimalPointDisabled = false;
    }
}

function disableButton(buttonToDisable, isDisableOperators=false) {
    if (isDisableOperators) {
        Array.from(containerOperatorButtons.children).forEach(buttonOperatorToDisable => {
            buttonOperatorToDisable.disabled = true;
        });
        areOperatorsDisabled = true;
    }

    buttonToDisable.disabled = true;

    if (buttonToDisable === buttonDecimalPoint) {
        isDecimalPointDisabled = true;
    }
} 

function showErrorMessage(errorToShow) {
    errorToShow.classList.remove('hidden');

    if (errorToShow === errorZero) {
        disableButton(buttonEqual, isDisableOperators=true);
        isZeroError = true;
    } else {
        isEqualError = true;
    }
}

function handleStartOfSecondNumber(valueToStartSecondNumber) {
    isOperator = false;
    isSecondNumber = true;
    number2 = valueToStartSecondNumber;
    addToDisplay(valueToStartSecondNumber);

    enableDecimalPointIfDisabled();

    if (checkIfZero(valueToStartSecondNumber) && operator === OPERATORS.DIVISION) {
        showErrorMessage(errorZero);
        return;
    }    
}

function checkIfDigit(symbolToCheck) {
    return (!isNaN(parseFloat(symbolToCheck)));
}

function handleOperatorDeletion(currentExpression) {
    containerDisplay.textContent = currentExpression.slice(0, -3);
}

function handleFirstNumberDeletion(firstNumberWithoutLastSymbol) {
    const firstNumberUpdated = (firstNumberWithoutLastSymbol.length > 0) ?firstNumberWithoutLastSymbol : '0';
            
    containerDisplay.textContent = firstNumberUpdated;
    number1 =  firstNumberUpdated;
}

function handleSecondNumberDeletion(currentExpressionWithoutLastSymbol, symbolPrevious) {
    containerDisplay.textContent = currentExpressionWithoutLastSymbol;
    number2 = number2.slice(0, -1);

    if (symbolPrevious === GAP) {
        isSecondNumber = false;
        isOperator = true;
    }
}

function deleteLastSymbol() {
    const currentDisplay = containerDisplay.textContent;
    const currentDisplayLength = containerDisplay.textContent.length;
    const currentSymbol = currentDisplay[currentDisplayLength - 1];
    const previousSymbol = currentDisplay[currentDisplayLength - 2]
    

    if (currentSymbol === SYMBOLS.DOT) {
        enableButton(buttonDecimalPoint);
    }

    disableIsResultIfActive()

    if (isOperator) {
        if (currentSymbol === GAP) { 
            handleOperatorDeletion(currentDisplay);
            operator = EMPTY;

            /*if (checkIfDigit(number1) && !isDecimalPointDisabled) { 
                disableButton(buttonDecimalPoint)
            } */
            if (!isDecimalPointDisabled) { 
                disableButton(buttonDecimalPoint)
            }
        } else { 
            isOperator = false;
            isFirstNumber = true;         
            handleFirstNumberDeletion(currentDisplayWithoutLastSymbol);
        }
    }



    const currentDisplayWithoutLastSymbol = currentDisplay.slice(0, -1);

    if (isSecondNumber) {
        handleSecondNumberDeletion(currentDisplayWithoutLastSymbol, previousSymbol);        
    } else if(isOperator) { 
        
    } else if (isFirstNumber) {
        handleFirstNumberDeletion(currentDisplayWithoutLastSymbol);
    }
}

function hideErrorMessage(errorToHide) {
    errorToHide.classList.add('hidden');

    if (errorToHide === errorZero) {
        enableButton(buttonEqual)
        enableOperators();
        isZeroError = false;
    } else {
        isEqualError = false;
    }
    
}

function handleContinueOfSecondNumber(valueToContinueSecondNumber) {
    const isSecondNumberZero = checkIfZero(number2);
    
    if (!isSecondNumberZero || number2 === '0.') { /// ???
        hideErrorMessage(errorZero);
    }

    if (isSecondNumberZero) {
        preventDoubleZero('second', valueToContinueSecondNumber);
    } else {
        number2 = add(number2, valueToContinueSecondNumber);
        addToDisplay(valueToContinueSecondNumber);
            /*deleteLastSymbol();
            number2 = valueToContinueSecondNumber;
            isSecondNumber = true;*/
    }
}

function handleDigitButton(digitValue) { 
    if (isFirstNumber) { 
        handleFirstNumber(digitValue);
    } else if (isOperator && !isSecondNumber) { 
        handleStartOfSecondNumber(digitValue);
    } else {  
        handleContinueOfSecondNumber(digitValue);
    }
} 

function handleOperatorButton(operatorValue) {
    disableButton(buttonDecimalPoint);

    if (isOperator) { // Display and use the last operator if the user has clicked more than one in a row
        deleteLastSymbol();
    }

    if (!isSecondNumber) {
        shiftFromFirstToOperator();   
    } else {
        getResult(isAfterEqualClick=false);
    }

    addToDisplay(operatorValue, gap=true)

    operator = operatorValue;  
}

function hideErrorIfEqualErrorDisplayed(inputType, symbolTyped) { // typeOfInput: keyboard or mouse
    if (isEqualError) {
        if (inputType === 'mouse' && symbolTyped !== buttonEqual) {
            hideErrorMessage(errorEqual);
        } else if (inputType === 'keyboard' && symbolTyped !== SYMBOLS.ENTER && symbolTyped !== SYMBOLS.EQUAL) {
            hideErrorMessage(errorEqual);
        }
    }
}

function handleKeyDown(event) {
    const keyPressed = event.key;

    hideErrorIfEqualErrorDisplayed('keyboard', keyPressed);
  
    if (checkIfDigit(keyPressed)) {
      handleDigitButton(keyPressed);
    } else if (Object.values(OPERATORS).includes(keyPressed)) {
        if (areOperatorsDisabled) {
            event.preventDefault();
        } else {
            handleOperatorButton(keyPressed);
        }
    } else if (keyPressed === SYMBOLS.DOT) {
        if (isDecimalPointDisabled) {
            event.preventDefault();
        } else {
            handleDecimalPointButton();
        }
    } else if (keyPressed === SYMBOLS.BACKSPACE) {
      deleteLastSymbol();
    } else if (keyPressed === SYMBOLS.ESCAPE) {
      clearAll();
    } else if (keyPressed === SYMBOLS.EQUAL || keyPressed === SYMBOLS.ENTER) {
        if (isZeroError) {
            event.preventDefault();
        } else {
            handleEqualSign();
        }
    } else {
      event.preventDefault();
    }
}

function handleDecimalPointButton() {
    const symbolPoint = buttonDecimalPoint.textContent;

    if (isFirstNumber) {
        number1 += symbolPoint;

        disableIsResultIfActive()
    } else {
        number2 += symbolPoint;
    }

    addToDisplay(symbolPoint);
    disableButton(buttonDecimalPoint);
}

function handleButtonClick(event) {
    const buttonClicked = event.target;

    hideErrorIfEqualErrorDisplayed('mouse', buttonClicked);

    switch (buttonClicked) {
        case buttonDecimalPoint:
            handleDecimalPointButton();
            break;
        case buttonClear:
            clearAll();
            break;
        case buttonDelete:
            deleteLastSymbol();
            break;
        case buttonEqual:
            handleEqualSign();
            break;
        default:
            const classButton = buttonClicked.classList;
            const valueOfClickedButton = buttonClicked.textContent;

            if (classButton.contains('button-digit')) {
            handleDigitButton(valueOfClickedButton);
            } else if (classButton.contains('button-operator')) {
            handleOperatorButton(valueOfClickedButton);
            }
            break;
    }
}

function addEventListeners() {
    document.addEventListener('keydown', handleKeyDown);
    containerButtons.addEventListener('click', handleButtonClick);
}
/////

function enableDecimalPointIfDisabled() {
    if (isDecimalPointDisabled) {
        enableButton(buttonDecimalPoint);
    }
}

function clearAll() {
    isSecondNumber = false;
    setDefaultValues();
    containerDisplay.textContent = number1;

    enableDecimalPointIfDisabled();  

    if (isZeroError) {
        hideErrorMessage(errorZero);
    }
}

function shiftFromFirstToOperator() {
    isFirstNumber = false;
    isOperator = true;
}

function getResult(isAfterEqualClick=true) {  // isAfterEqualClick = true when we enter the function after the clicking '=', false after clicking any other operator.
    let result = operate(parseFloat(number1), parseFloat(number2), operator);

    containerDisplay.textContent = parseFloat(result.toFixed(5));
    
    number1 = result.toString();
    isResult = true;
    number2 = EMPTY; 
    isSecondNumber = false;

    if (isAfterEqualClick) {
        isFirstNumber = true;
        isOperator = false;
        operator = EMPTY;
    } else {
        shiftFromFirstToOperator();
    }

    if (!Number.isInteger(result)) {
        disableButton(buttonDecimalPoint);
    } else {
        enableDecimalPointIfDisabled();
    } 
}

function handleEqualSign(){
    if (!isSecondNumber) {
        showErrorMessage(errorEqual);
        return;
    }

    getResult();
}

