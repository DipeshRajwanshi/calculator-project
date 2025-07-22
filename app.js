const display = document.getElementById("display");
let memory = 0;

const updateDisplay = (value) => (display.value = value);
const getDisplayValue = () => parseFloat(display.value) || 0;

function appendNumber(num) {
  display.value += num;
}

function appendOperator(op) {
  const lastChar = display.value.slice(-1);
  if ("+-*/".includes(lastChar)) return;
  display.value += op;
}

function clearDisplay() {
  updateDisplay("");
}

function backspace() {
  updateDisplay(display.value.slice(0, -1));
}

function calculate() {
  try {
    if (!display.value) return;
    const result = eval(display.value);
    if (!isFinite(result)) throw new Error();
    updateDisplay(result);
  } catch {
    showError();
  }
}

function calculateSquareRoot() {
  const value = getDisplayValue();
  if (value < 0) return showError();
  updateDisplay(Math.sqrt(value));
}

function calculatePercentage() {
  updateDisplay(getDisplayValue() / 100);
}

function memoryAdd() {
  memory += getDisplayValue();
}

function memorySubtract() {
  memory -= getDisplayValue();
}

function memoryRecall() {
  display.value += memory;
}

function memoryClear() {
  memory = 0;
}

function showError() {
  updateDisplay("Error");
  setTimeout(clearDisplay, 1500);
}

// Keyboard support
document.addEventListener("keydown", (e) => {
  const key = e.key;
  if (!isNaN(key) || "+-*/.".includes(key)) appendNumber(key);
  else if (key === "Enter") calculate();
  else if (key === "Backspace") backspace();
  else if (key === "Escape") clearDisplay();
});
