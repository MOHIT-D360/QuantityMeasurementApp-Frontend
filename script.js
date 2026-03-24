// ── REGEX PATTERNS ──
const REGEX = {
  email:    /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/,
  password: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
  name:     /^[a-zA-Z\s]{2,50}$/,
  mobile:   /^(\+?\d{1,3}[\s\-]?)?\d{10}$/
};

const MSGS = {
  email:    'Enter a valid email address.',
  password: 'Min 8 chars, 1 uppercase, 1 digit & 1 special char.',
  name:     'Name must be 2–50 letters.',
  mobile:   'Enter a valid 10-digit mobile number.'
};

// ── TAB SWITCH ──
function switchTab(tab) {
  const isLogin = tab === 'login';
  document.getElementById('loginTab').classList.toggle('active', isLogin);
  document.getElementById('signupTab').classList.toggle('active', !isLogin);
  document.getElementById('loginForm').classList.toggle('active', isLogin);
  document.getElementById('signupForm').classList.toggle('active', !isLogin);
}

// ── ERROR ID MAP ──
function getErrId(inputId) {
  const map = {
    fullName:       'fullNameErr',
    signupEmail:    'signupEmailErr',
    signupPassword: 'signupPasswordErr',
    mobile:         'mobileErr',
    loginEmail:     'loginEmailErr',
    loginPassword:  'loginPasswordErr'
  };
  return map[inputId] || inputId + 'Err';
}

// ── SET FIELD STATE ──
function setFieldState(input, errEl, state, msg) {
  input.classList.remove('error', 'success');
  if (state === 'error')   input.classList.add('error');
  if (state === 'success') input.classList.add('success');
  errEl.textContent = msg;
  errEl.classList.toggle('show', !!msg);
}

// ── LIVE VALIDATION (on input / blur) ──
function liveValidate(input, type) {
  const errId = getErrId(input.id);
  const err   = document.getElementById(errId);
  if (!err) return;

  const val = input.value.trim();

  if (!val) {
    setFieldState(input, err, 'neutral', '');
    return;
  }

  if (REGEX[type].test(val)) {
    setFieldState(input, err, 'success', '');
  } else {
    setFieldState(input, err, 'error', MSGS[type]);
  }
}

// ── VALIDATE FIELD ON SUBMIT ──
function validateField(inputId, type) {
  const input = document.getElementById(inputId);
  const errId = getErrId(inputId);
  const err   = document.getElementById(errId);
  const val   = input.value.trim();

  if (!val) {
    setFieldState(input, err, 'error', 'This field is required.');
    return false;
  }
  if (!REGEX[type].test(val)) {
    setFieldState(input, err, 'error', MSGS[type]);
    return false;
  }
  setFieldState(input, err, 'success', '');
  return true;
}

// ── TOGGLE PASSWORD VISIBILITY ──
const eyeOnSVG  = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
const eyeOffSVG = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;

function togglePw(inputId, btn) {
  const input   = document.getElementById(inputId);
  const isHidden = input.type === 'password';
  input.type     = isHidden ? 'text' : 'password';
  btn.innerHTML  = isHidden ? eyeOnSVG : eyeOffSVG;
}

// ── TOAST NOTIFICATION ──
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ── FORM SUBMISSIONS ──
function submitLogin() {
  const emailOk = validateField('loginEmail',    'email');
  const pwOk    = validateField('loginPassword', 'password');
  if (emailOk && pwOk) showToast('✓ Login successful! Welcome back.');
}

function submitSignup() {
  const nameOk   = validateField('fullName',       'name');
  const emailOk  = validateField('signupEmail',    'email');
  const pwOk     = validateField('signupPassword', 'password');
  const mobileOk = validateField('mobile',         'mobile');
  if (nameOk && emailOk && pwOk && mobileOk) showToast('✓ Account created! Please log in.');
}
