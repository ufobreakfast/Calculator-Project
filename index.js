// calcualtor program 
// const display = document.getElementById("display");

// function appendToDisplay(input){
//     display.value += input;
// }

// function clearDisplay(){
//     display.value = "";
// }

// function calculate(){
//     try{
//         display.value = eval(display.value);
//     }
//    catch(error){
//     display.value = "Error";
//    }

// }

const display = document.getElementById("display");

function appendToDisplay(input){
    display.value += input;
}

function clearDisplay(){
    display.value = "";
}

function calculate(){
    try{
        let expression = display.value;
        expression = expression.replace(/[^-()\d/*+.]/g, '');
        
        const result = evaluateExpression(expression);
        
        if (result === undefined || isNaN(result)) {
            throw new Error('Invalid expression');
        }
        
        display.value = result;
    } catch (error) {
        display.value = 'Error';
    }
}

function evaluateExpression(expression) {
    const operators = ['+', '-', '*', '/'];
    const operatorPrecedence = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    };

    const values = [];
    const operatorsStack = [];

    let currentNumber = '';

    for (let i = 0; i < expression.length; i++) {
        const char = expression[i];

        if (!isNaN(char) || char === '.') {
            currentNumber += char;
        } else if (char === '(') {
            operatorsStack.push(char);
        } else if (char === ')') {
            while (operatorsStack.length > 0 && operatorsStack[operatorsStack.length - 1] !== '(') {
                performOperation(values, operatorsStack.pop());
            }
            operatorsStack.pop(); // Pop '('
        } else if (operators.includes(char)) {
            while (operatorsStack.length > 0 && operatorPrecedence[operatorsStack[operatorsStack.length - 1]] >= operatorPrecedence[char]) {
                performOperation(values, operatorsStack.pop());
            }
            operatorsStack.push(char);
        }

        if (isNaN(expression[i + 1]) && expression[i + 1] !== '.') {
            if (currentNumber !== '') {
                values.push(parseFloat(currentNumber));
                currentNumber = '';
            }
        }
    }

    while (operatorsStack.length > 0) {
        performOperation(values, operatorsStack.pop());
    }

    return values[0];
}

function performOperation(values, operator) {
    const operand2 = values.pop();
    const operand1 = values.pop();
    let result;

    switch (operator) {
        case '+':
            result = operand1 + operand2;
            break;
        case '-':
            result = operand1 - operand2;
            break;
        case '*':
            result = operand1 * operand2;
            break;
        case '/':
            if (operand2 === 0) {
                throw new Error('Division by zero');
            }
            result = operand1 / operand2;
            break;
        default:
            throw new Error('Invalid operator');
    }

    values.push(result);
}
