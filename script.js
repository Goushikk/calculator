let display = document.getElementById('display');
let currentInput = '0';
let previousInput = '0';
let operator = null;
let waitingForSecondOperand = false;

function updateDisplay() {
    display.textContent = currentInput;
}

function appendNumber(number) {
    if (waitingForSecondOperand || currentInput === '0') {
        currentInput = number;
        waitingForSecondOperand = false;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function appendDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay();
    }
}

function appendOperator(op) {
    if (operator !== null && !waitingForSecondOperand) {
        calculate();
    }
    previousInput = currentInput;
    operator = op;
    waitingForSecondOperand = true;
    currentInput = '0';
    updateDisplay();
}

function changeSign() {
    if (currentInput !== '0' && currentInput !== '') {
        currentInput = (parseFloat(currentInput) * -1).toString();
        updateDisplay();
    }
}

function clearDisplay() {
    currentInput = '0';
    previousInput = '0';
    operator = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

function calculate() {
    let result;
    const current = parseFloat(currentInput);
    const previous = parseFloat(previousInput);

    if (isNaN(previous) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = previous + current;
            break;
        case '-':
            result = previous - current;
            break;
        case '*':
            result = previous * current;
            break;
        case '/':
            if (current === 0) {
                display.textContent = "Error: Division by zero";
                currentInput = '0';
                return;
            }
            result = previous / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = null;
    waitingForSecondOperand = false;
    updateDisplay();
}
