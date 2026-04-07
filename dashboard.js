// ─────────────────────────────────────────
//  UNITS DATA
//  Each unit has a factor to convert TO the base unit.
//  Base units: meter, kilogram, celsius, liter
// ─────────────────────────────────────────

const UNITS = {
  length: [
    { name: 'Millimeter',  factor: 0.001 },
    { name: 'Centimeter',  factor: 0.01  },
    { name: 'Meter',       factor: 1     },
    { name: 'Kilometer',   factor: 1000  },
    { name: 'Inch',        factor: 0.0254 },
    { name: 'Foot',        factor: 0.3048 },
    { name: 'Yard',        factor: 0.9144 },
    { name: 'Mile',        factor: 1609.34 }
  ],
  weight: [
    { name: 'Milligram',   factor: 0.000001 },
    { name: 'Gram',        factor: 0.001    },
    { name: 'Kilogram',    factor: 1        },
    { name: 'Ton',         factor: 1000     },
    { name: 'Pound',       factor: 0.453592 },
    { name: 'Ounce',       factor: 0.0283495 }
  ],
  temperature: [
    { name: 'Celsius'    },
    { name: 'Fahrenheit' },
    { name: 'Kelvin'     }
  ],
  volume: [
    { name: 'Milliliter',  factor: 0.001 },
    { name: 'Liter',       factor: 1     },
    { name: 'Cubic Meter', factor: 1000  },
    { name: 'Cup',         factor: 0.236588 },
    { name: 'Pint',        factor: 0.473176 },
    { name: 'Gallon',      factor: 3.78541  }
  ]
};

// ─────────────────────────────────────────
//  STATE
// ─────────────────────────────────────────

let currentType   = 'length';
let currentAction = 'arithmetic';

// ─────────────────────────────────────────
//  SELECT TYPE (Length / Weight / etc.)
// ─────────────────────────────────────────

function selectType(type, card) {
  // update active card
  document.querySelectorAll('.type-card').forEach(c => c.classList.remove('active'));
  card.classList.add('active');

  currentType = type;

  // refill all dropdowns with new units
  fillAllDropdowns();
  calculate();
}

// ─────────────────────────────────────────
//  SELECT ACTION (Comparison / Conversion / Arithmetic)
// ─────────────────────────────────────────

function selectAction(action, btn) {
  // update active button
  document.querySelectorAll('.action-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  currentAction = action;

  // hide all panels, show the right one
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.getElementById('panel-' + action).classList.add('active');

  calculate();
}

// ─────────────────────────────────────────
//  FILL DROPDOWNS
// ─────────────────────────────────────────

function fillDropdown(selectId, defaultIndex) {
  var sel = document.getElementById(selectId);
  sel.innerHTML = '';
  var units = UNITS[currentType];
  units.forEach(function(u, i) {
    var opt = document.createElement('option');
    opt.value = i;
    opt.textContent = u.name;
    sel.appendChild(opt);
  });
  sel.selectedIndex = defaultIndex || 0;
}

function fillAllDropdowns() {
  var units = UNITS[currentType];
  var lastIndex = units.length - 1;

  // Comparison
  fillDropdown('cmp-unit1', lastIndex);   // default: last unit (e.g. Kilometer)
  fillDropdown('cmp-unit2', 0);           // default: first unit (e.g. Millimeter)

  // Conversion
  fillDropdown('conv-unit1', lastIndex);
  fillDropdown('conv-unit2', 0);

  // Arithmetic
  fillDropdown('arith-unit1', lastIndex);
  fillDropdown('arith-unit2', 0);
  fillDropdown('arith-result-unit', lastIndex);
}

// ─────────────────────────────────────────
//  CONVERT TO BASE UNIT
// ─────────────────────────────────────────

function toBase(value, unitIndex) {
  var unit = UNITS[currentType][unitIndex];

  // Temperature needs special formula
  if (currentType === 'temperature') {
    var name = unit.name;
    if (name === 'Celsius')    return value;
    if (name === 'Fahrenheit') return (value - 32) * 5 / 9;
    if (name === 'Kelvin')     return value - 273.15;
  }

  return value * unit.factor;
}

function fromBase(value, unitIndex) {
  var unit = UNITS[currentType][unitIndex];

  if (currentType === 'temperature') {
    var name = unit.name;
    if (name === 'Celsius')    return value;
    if (name === 'Fahrenheit') return (value * 9 / 5) + 32;
    if (name === 'Kelvin')     return value + 273.15;
  }

  return value / unit.factor;
}

// ─────────────────────────────────────────
//  CALCULATE
// ─────────────────────────────────────────

function calculate() {
  if (currentAction === 'comparison') doComparison();
  if (currentAction === 'conversion') doConversion();
  if (currentAction === 'arithmetic') doArithmetic();
}

// ── COMPARISON ──
function doComparison() {
  var val1     = parseFloat(document.getElementById('cmp-val1').value) || 0;
  var val2     = parseFloat(document.getElementById('cmp-val2').value) || 0;
  var unit1Idx = parseInt(document.getElementById('cmp-unit1').value);
  var unit2Idx = parseInt(document.getElementById('cmp-unit2').value);

  // convert both to base, then compare
  var base1 = toBase(val1, unit1Idx);
  var base2 = toBase(val2, unit2Idx);

  var unit1Name = UNITS[currentType][unit1Idx].name;
  var unit2Name = UNITS[currentType][unit2Idx].name;

  var resultText;
  if (base1 > base2) {
    resultText = val1 + ' ' + unit1Name + ' > ' + val2 + ' ' + unit2Name;
  } else if (base1 < base2) {
    resultText = val1 + ' ' + unit1Name + ' < ' + val2 + ' ' + unit2Name;
  } else {
    resultText = val1 + ' ' + unit1Name + ' = ' + val2 + ' ' + unit2Name;
  }

  document.getElementById('cmp-result-text').textContent = resultText;
}

// ── CONVERSION ──
function doConversion() {
  var val      = parseFloat(document.getElementById('conv-val').value) || 0;
  var unit1Idx = parseInt(document.getElementById('conv-unit1').value);
  var unit2Idx = parseInt(document.getElementById('conv-unit2').value);

  var base   = toBase(val, unit1Idx);
  var result = fromBase(base, unit2Idx);

  document.getElementById('conv-result-val').value = formatNumber(result);
}

// ── ARITHMETIC ──
function doArithmetic() {
  var val1       = parseFloat(document.getElementById('arith-val1').value) || 0;
  var val2       = parseFloat(document.getElementById('arith-val2').value) || 0;
  var unit1Idx   = parseInt(document.getElementById('arith-unit1').value);
  var unit2Idx   = parseInt(document.getElementById('arith-unit2').value);
  var resultUnit = parseInt(document.getElementById('arith-result-unit').value);
  var operator   = document.getElementById('arith-operator').value;

  // convert both values to base unit first
  var base1 = toBase(val1, unit1Idx);
  var base2 = toBase(val2, unit2Idx);

  var baseResult;
  if (operator === '+') baseResult = base1 + base2;
  if (operator === '-') baseResult = base1 - base2;
  if (operator === '*') baseResult = base1 * base2;
  if (operator === '/') baseResult = base2 !== 0 ? base1 / base2 : 0;

  // convert result to chosen result unit
  var finalResult = fromBase(baseResult, resultUnit);

  document.getElementById('arith-result-text').textContent = formatNumber(finalResult);
}

// ─────────────────────────────────────────
//  HELPER: FORMAT NUMBER
// ─────────────────────────────────────────

function formatNumber(num) {
  // if it's a whole number, show no decimals
  if (num % 1 === 0) return num.toString();
  // otherwise round to 4 decimal places and remove trailing zeros
  return parseFloat(num.toFixed(4)).toString();
}

// ─────────────────────────────────────────
//  INIT ON PAGE LOAD
// ─────────────────────────────────────────

window.onload = function() {
  fillAllDropdowns();

  // show default panel (arithmetic)
  document.getElementById('panel-arithmetic').classList.add('active');

  calculate();
};

// ─────────────────────────────────────────
//  LOGOUT
// ─────────────────────────────────────────

function logout() {
  window.location.href = 'index.html';
}
