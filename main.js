// bhvr ref https://mrbuddh4.github.io/calculator/

// unhandled
// calling operate() for % without num2 arg
// irrational decimals and long nums
// other todo
// ignoring c state for ac button, not worth

// globals
let dispVal = 0;
let expr = {
    num1: 0,
    op: null,
    num2: null,
};
let prevExpr = {
    num1: 0,
    op: null,
    num2: null,
};
let prevEq = false;

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
    val = val + ""
    if (val.length > 9) {
        val = val.slice(0, 10)
    }
    if (val.length > 1 && val[val.length-1] == "0") {
        val = parseFloat(val);
    }
    disp.textContent = val;
    dispVal = parseFloat(val);
}

// num btns
const disp = document.querySelector("#display");
const numBtns = document.querySelectorAll(".num-btn");
numBtns.forEach(numBtn => numBtn.addEventListener("click", () => numDisplay(numBtn.textContent)));

function numDisplay(num) {
    if (disp.textContent == "0" || dispVal == null || prevEq) {
        updateDisplay(num);
        prevEq = false;
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
    prevExpr = expr;
}

function clearExpression() {
    prevExpr = JSON.parse(JSON.stringify(expr));
    expr.num1 = dispVal;
    expr.op = null;
    expr.num2 = null;
}

// op btns
const opBtns = document.querySelectorAll(".op-btn");
opBtns.forEach(opBtn => opBtn.addEventListener("click", () => handleOp(opBtn)))

function handleOp(opBtn) {  // num1 is never null, 0 when reset
    // TODO: highlight lock opBtn
    // case 1: num1 -> op, wait for num2
    if (expr.num2 == null && expr.op == null) {
        expr.num1 = dispVal;
        expr.op = opBtn.textContent;
        dispVal = null;
    }
    // case 2: num2 -> op, eval and wait for num2
    else if (expr.num2 == null && expr.op != null && dispVal != null) {
        expr.num2 = dispVal;
        evaluateExpression(expr.num1, expr.op, expr.num2);
        expr.op = opBtn.textContent;
        dispVal = null;
    }
    // case 3: op -> op, switch op
    else {
        expr.op = opBtn.textContent;
    }
}

// % btn
//TODO: handle % (not considered an opBtn)
// prevEq = true;

// eq btn
const eqBtn = document.querySelector("#eq-btn");
eqBtn.addEventListener("click", handleEq);

function handleEq() {
    // case 1: num2 -> eq, eval and wait for next op
    if (expr.num2 == null && expr.op != null && dispVal != null) {
        expr.num2 = dispVal;
        evaluateExpression(expr.num1, expr.op, expr.num2);
    }
    // case 2: num1 -> op -> eq, use num1 as num2
    else if (expr.op != null && dispVal == null) {
        expr.num2 = expr.num1;
        evaluateExpression(expr.num1, expr.op, expr.num2);
    }
    // case 3: num2 -> eq -> eq, use prev op and num2 w cur num1
    else if (expr.op == null && expr.num2 == null && prevExpr.op !=  null && prevExpr.num2 != null) {
        expr.num1 = dispVal;
        expr.op = prevExpr.op;
        expr.num2 = prevExpr.num2;
        evaluateExpression(expr.num1, expr.op, expr.num2);
    }
    prevEq = true;
}

function evaluateExpression(num1, op, num2) {
    const result = operate(num1, op, num2)
    updateDisplay(result);
    clearExpression();
}

// . btn
const decBtn = document.querySelector("#dec-btn");
decBtn.addEventListener("click", handleDec);

function handleDec() {
    dispStr = dispVal + "";
    if (!dispStr.includes(".")) {
        if (dispStr == "null" || dispStr == "Error" || prevEq) {
            updateDisplay("0.");
            prevEq = false;
        }
        else {
            updateDisplay(dispVal + ".");
        }
    }
}

// post-error state
// TODO: handle after error, all ops with num1 as error eval to error
// break out of error w ac or any num button or . button
// disable +/- button
// prevEq = false;