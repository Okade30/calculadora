// ---display---
let buffer = '0';
let runningTotal = 0;
let previousOperator;
const display = document.querySelector(".display");

function rerender() {
  display.innerText = buffer
}
// ---funcionalidades---
function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbols(value);
  } else {
    handleNumber(value);
  }
  // NaN significa Not A Number
  rerender();
}


function init() {
  document.querySelector(".calc").addEventListener("click", function (event) {
    buttonClick(event.target.innerText);
  });
}

init();


function handleNumber(value) {
  if (buffer === '0') {
    buffer = value
  } else {
    buffer += value
    //  display = display + number
  }
}
function handleSymbols(value) {

  switch (value) {
    case 'C':
      buffer = '0';
      runningTotal = 0;
      break;
    case '←':
      if (buffer.length === 1) {
        buffer = '0'
      } else {
        buffer = buffer.substring(0, buffer.length - 1)
      }
      break
    case '=':
      if (previousOperator === null) {
        // necesitas numberos para hacer las math
        return;
      }
      operations(parseInt(buffer));
      previousOperator = null
      buffer =+runningTotal
      runningTotal = 0
      break
    case '+':
    case '-':
    case '*':
    case '÷':
      handleMath(value);
      break;
  }

}
// ---operadores---
function handleMath(value) {
  if (buffer === '0') {
    // no hagas nada
    return;
  }
  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer
  } else {
    operations(intBuffer);
  }
  previousOperator = value
  buffer = '0'
}

function operations(intBuffer) {
  if (previousOperator === "+") {
    runningTotal += intBuffer;
  } else if (previousOperator === "-") {
    runningTotal -= intBuffer;
  } else if (previousOperator === "*") {
    runningTotal *= intBuffer;
  } else {
    runningTotal /= intBuffer;
  }
}

