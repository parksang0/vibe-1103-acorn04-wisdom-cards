const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');
const themeToggle = document.getElementById('theme-toggle');

// 최근 5개 계산 기록
const history = [];

function setTheme(theme) {
  if (theme === 'light') {
    document.body.classList.add('light-theme');
    themeToggle.textContent = 'Dark';
    themeToggle.setAttribute('aria-label', 'Switch to dark theme');
    localStorage.setItem('calculator-theme', 'light');
  } else {
    document.body.classList.remove('light-theme');
    themeToggle.textContent = 'Light';
    themeToggle.setAttribute('aria-label', 'Switch to light theme');
    localStorage.setItem('calculator-theme', 'dark');
  }
}

const savedTheme = localStorage.getItem('calculator-theme');
setTheme(savedTheme === 'light' ? 'light' : 'dark');

themeToggle.addEventListener('click', () => {
  const isLight = document.body.classList.contains('light-theme');
  setTheme(isLight ? 'dark' : 'light');
});

function updateDisplay(value) {
  if (value === '' || value === null) {
    display.value = '';
    display.placeholder = '0';
    return;
  }
  display.value = value;
  display.placeholder = '0';
}

function getDisplayValue() {
  return display.value || display.placeholder || '0';
}

function calculate() {
  const expr = getDisplayValue().trim();
  if (!expr) return;

  // 계산식만 허용 (숫자, 연산자, 소수점)
  const safeExpr = expr.replace(/[^\d+\-*/. ]/g, '');
  if (!safeExpr) return;

  try {
    const result = eval(safeExpr);
    if (typeof result !== 'number' || !isFinite(result)) {
      updateDisplay('Error');
      return;
    }
    const resultStr = Number.isInteger(result) ? String(result) : String(Number(result.toFixed(10)));
    const record = `${expr} = ${resultStr}`;
    history.push(record);
    if (history.length > 5) history.shift();
    console.log('최근 계산 기록:', [...history]);
    updateDisplay(resultStr);
  } catch (e) {
    updateDisplay('Error');
  }
}

function clearDisplay() {
  updateDisplay('');
}

function appendToDisplay(char) {
  const current = getDisplayValue();
  if (current === '0' && char !== '.' && !'+-*/'.includes(char)) {
    updateDisplay(char);
    return;
  }
  if (current === 'Error') updateDisplay('');
  updateDisplay((getDisplayValue() || '') + char);
}

// 버튼 클릭
buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const value = btn.getAttribute('data-value');
    if (value === '=') calculate();
    else if (value === 'C') clearDisplay();
    else appendToDisplay(value);
  });
});

// 키보드 입력
document.addEventListener('keydown', (e) => {
  const key = e.key;
  if (key >= '0' && key <= '9') {
    appendToDisplay(key);
    e.preventDefault();
    return;
  }
  if (['+', '-', '*', '/'].includes(key)) {
    appendToDisplay(key);
    e.preventDefault();
    return;
  }
  if (key === '.') {
    appendToDisplay(key);
    e.preventDefault();
    return;
  }
  if (key === 'Enter') {
    e.preventDefault();
    calculate();
  }
});
