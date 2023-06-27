// ios calulator clone
// buttons for digits, ops, equals, clear
// num display as user presses buttons, only 1 num in disp
// lock highlight on ops buttons when they're pressed but not yet evaled

// bhvr ref https://mrbuddh4.github.io/calculator/

// for each button, check prev button value
// if num -> num OR num first, replace default 0 and append until max length
// if num -> op OR op first, save cur display as num1 (default 0), save op as op, ready for num2
// if op -> op OR op -> =, use num1 as num2
// if op -> num, calculate upon next op or = button
// if = => = (repeat prev op with cur as num1 and prev num2)
// if num -> =, replace prev num2 with cur and evaluate with prev num1 and prev op (or do nothing)

// calling operate() for % without num2 arg
// irrational decimals and long nums
// div by 0 (what happens if you try continuing calculation after)
// could implement c state for ac button

// globals
let dispVal = 0;
let expression = {
    num1: 0,
    op: null,
    num2: null,
};
let prevExpression = {
    num1: 0,
    op: null,
    num2: null,
};

// basic funcs
function add(num1, num2) {
    return num1 + num2;
}

function sub(num1, num2) {
    return num1 - num2;
}

function mult(num1, num2) {
    return num1 * num2;
}

function div(num1, num2) {
    if (num2 == 0) {
        throw new Error("Error");
    }
    return num1 / num2;
}

function per(num) {
    return num/100;
}

function operate(num1, op, num2) {
    try {
        if (op == "+") {
            return add(num1, num2);
        }
        if (op == "-") {
            return sub(num1, num2);
        }
        if (op == "*") {
            return mult(num1, num2);
        }
        if (op == "/") {
            return div(num1, num2);
        }
        if (op == "%") {
            return per(num1);
        }
    }
    catch (e) {
        return "Error"
    }
}

// update disp
function updateDisplay(val) {
    disp.textContent = val;
    dispVal = parseInt(val);
}

// TODO: handle after error, all ops with num1 as error eval to error
// break out of error w ac or any num button or . button
// disable +/- button

// TODO: handle . button

// num btns
const disp = document.querySelector(".display");
const numBtns = document.querySelectorAll(".num-btn");
numBtns.forEach(numBtn => numBtn.addEventListener("click", () => numDisplay(numBtn.textContent)));

function numDisplay(num) {
    if (disp.textContent == 0 || (dispVal == null)) {
        updateDisplay(num);
    }
    else {
        updateDisplay(disp.textContent + num + "");
    }
}

// +/- btn
const negBtn = document.querySelector("#neg-btn");
negBtn.addEventListener("click", negateDisplay);

function negateDisplay() {
    if (disp.textContent[0] != "-") {
        updateDisplay("-" + disp.textContent);
    }
    else {
        updateDisplay(disp.textContent.slice(1));
    }
}

// ac btn
const ac = document.querySelector("#ac-btn");
ac.addEventListener("click", clearDisplay);

function clearDisplay() {
    updateDisplay(0);
    clearExpression();
}

function clearExpression() {
    prevExpression = expression;
    console.log(prevExpression);
    expression.num1 = dispVal;
    expression.op = null;
    expression.num2 = null;
    console.log(expression);
    console.log(prevExpression);
}

// op btns
const opBtns = document.querySelectorAll(".op-btn");
opBtns.forEach(opBtn => opBtn.addEventListener("click", () => handleOp(opBtn)))
//TODO: handle % separately (not considered an opBtn)

const eqBtn = document.querySelector("#eq-btn");
eqBtn.addEventListener("click", handleEq);

function handleOp(opBtn) {  // num1 is never null, 0 when reset
    console.log(expression);
    // TODO: highlight opBtn
    // case 1: num1 -> op, wait for num2
    if (expression.num2 == null && expression.op == null) {
        expression.num1 = dispVal;
        expression.op = opBtn.textContent;
        dispVal = null;
    }
    // case 2: num2 -> op, eval and wait for num2
    else if (expression.num2 == null && expression.op != null && dispVal != null) {
        expression.num2 = dispVal;
        console.log(expression)
        evaluateExpression(expression.num1, expression.op, expression.num2);
        expression.op = opBtn.textContent;
        dispVal = null;

    }
    console.log(expression);
}

function handleEq() {
    // case 1: num2 -> eq, eval and wait for op
    if (expression.num2 == null && expression.op != null && dispVal != null) {
        expression.num2 = dispVal;
        console.log(expression)
        evaluateExpression(expression.num1, expression.op, expression.num2);
    }
    // case 2: num1 -> op -> eq, use num1 as num2
    // else if (opBtn == eqBtn && expression.op != null && dispVal == null) {
        
    // }
    // case 3: num2 -> eq -> eq, use prev op and num2 w cur num1

}

function evaluateExpression(num1, op, num2) {
    console.log(expression);
    const result = operate(num1, op, num2)
    updateDisplay(result);
    clearExpression();
}