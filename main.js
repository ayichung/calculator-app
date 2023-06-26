// features
// +, -, *, / two nums
// one op is <num op num>

// buttons for digits, ops, equals, clear
// num display as user presses buttons, only 1 num in disp
// lock highlight on ops buttons when they're pressed but not yet evaled

// bhvr ref https://mrbuddh4.github.io/calculator/
// bhvr should be like iphone calc, eval nums in pairs as the user strings more
// ex 1 + 3 - 2 = should turn into 4 - 2 and then 2

// for each button, check prev button value
// if num -> num OR num first, replace default 0 and append until max length
// if num -> op OR op first, save cur display as num1 (default 0), save op as op, ready for num2
// if op -> op, use num1 as num2
// if op -> num, calculate upon next op or = button
// when two nums and one op, call operate()
// maybe use global arr to keep track, not sure how bugproof it is tho

// calling operate() for % where there's no num2
// irrational decimals
// div by 0
// could implement c state for ac button

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

const disp = document.querySelector(".display");
const numBtns = document.querySelectorAll(".num-btn");
numBtns.forEach(numBtn => numBtn.addEventListener("click", () => changeDisplay(numBtn.textContent)));

function changeDisplay(num) {
    if (disp.textContent == 0) {
        disp.textContent = num;
    }
    else {
        disp.textContent = disp.textContent + num + "";
    }
}

const negBtn = document.querySelector("#neg-btn");
negBtn.addEventListener("click", negateDisplay);

function negateDisplay() {
    if (disp.textContent[0] != "-") {
        disp.textContent = "-" + disp.textContent;
    }
    else {
        disp.textContent = disp.textContent.slice(1);
    }
}


const ac = document.querySelector("#ac-btn");
ac.addEventListener("click", clearDisplay);

function clearDisplay() {
    disp.textContent = "0";
}

