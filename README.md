# 📚 Online Book Shopping — Login & Signup Page

A clean, responsive **Login / Signup UI** for an Online Book Shopping platform built with pure **HTML, CSS, and JavaScript** — no frameworks, no libraries.

---

## 📁 Project Structure

```
📦 online-book-shopping/
├── index.html      → Page structure & markup
├── style.css       → All styling, layout & animations
└── script.js       → Form validation & interactivity
```

---

## 🖥️ Preview

| Desktop View | Mobile View |
|---|---|
| Shows logo card + auth form side by side | Logo card hidden, only auth form shown |

> The layout automatically adapts — on screens smaller than **680px**, the illustration panel hides and the form takes full width.

---

## 📄 File Breakdown

### 1. `index.html` — Structure
The main HTML file that holds all the markup. It links to the external CSS and JS files.

**Key sections:**
- **Logo Card** — Contains the inline SVG illustration of a person in a shopping cart and the brand name *"Online Book Shopping"*
- **Auth Card** — Contains the tab buttons (Login / Signup) and both form panels
- **Login Form** — Fields: Email, Password
- **Signup Form** — Fields: Full Name, Email, Password, Mobile Number
- **Toast `<div>`** — Hidden by default; shown on successful form submission

```html
<link rel="stylesheet" href="style.css" />   <!-- CSS link in <head> -->
<script src="script.js"></script>             <!-- JS link before </body> -->
```

---

### 2. `style.css` — Styling
All visual design, layout rules, animations, and responsive behaviour live here.

**Highlights:**

| Section | Description |
|---|---|
| `:root` variables | Central color palette (`--crimson`, `--bg`, `--shadow`, etc.) |
| `.wrapper` | Flexbox container that holds both cards side by side |
| `.logo-card` | Left panel with illustration; hidden below 680px via media query |
| `.auth-card` | Right panel with tabs and forms |
| `.tab-btn::after` | Animated red underline that slides under the active tab |
| `.form-panel` | Hidden by default (`display: none`); shown when `.active` class is added |
| `@keyframes fadeUp` | Smooth slide-up + fade-in animation when switching tabs |
| `input.error` | Red border on invalid input |
| `input.success` | Green border on valid input |
| `.btn-submit` | Crimson button with hover lift effect and box-shadow |
| `.toast` | Fixed bottom notification that slides up on success |
| `@media (max-width: 680px)` | Hides logo card; makes auth card full-width with rounded corners |

---

### 3. `script.js` — Logic & Validation
All interactivity is handled here — tab switching, live validation, password toggle, and form submission.

**Functions:**

#### `switchTab(tab)`
Switches between Login and Signup views.
- Accepts `'login'` or `'signup'` as argument
- Uses a boolean flag `isLogin` to toggle `.active` class on both tab buttons and form panels
```js
function switchTab(tab) {
  const isLogin = tab === 'login';
  document.getElementById('loginTab').classList.toggle('active', isLogin);
  document.getElementById('signupTab').classList.toggle('active', !isLogin);
  document.getElementById('loginForm').classList.toggle('active', isLogin);
  document.getElementById('signupForm').classList.toggle('active', !isLogin);
}
```

#### `liveValidate(input, type)`
Runs in real-time as the user types (`oninput`) or leaves a field (`onblur`).
- Checks the value against the matching regex pattern
- Shows green border on valid, red border + error message on invalid
- Clears state if field is empty

#### `validateField(inputId, type)`
Called on form submission — shows "required" error if field is empty, otherwise runs regex check.

#### `setFieldState(input, errEl, state, msg)`
Central helper that adds/removes `.error` / `.success` CSS classes and shows/hides the error message `<span>`.

#### `getErrId(inputId)`
Maps each input's `id` to its corresponding error `<span>` `id`.

#### `togglePw(inputId, btn)`
Toggles password field between `type="password"` and `type="text"`. Swaps the eye icon SVG accordingly.

#### `showToast(msg)`
Displays a bottom notification for 3 seconds by adding/removing the `.show` class.

#### `submitLogin()` / `submitSignup()`
Trigger full validation on all fields. If all pass, calls `showToast()` with a success message.

---

## ✅ Validation Rules

| Field | Rule |
|---|---|
| Full Name | Letters and spaces only, 2–50 characters |
| Email | Standard email format (e.g. `user@example.com`) |
| Password | Min 8 characters, at least 1 uppercase letter, 1 digit, 1 special character |
| Mobile Number | 10-digit number, optional country code prefix (e.g. `+91`) |

**Regex patterns used:**
```js
email:    /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/
password: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/
name:     /^[a-zA-Z\s]{2,50}$/
mobile:   /^(\+?\d{1,3}[\s\-]?)?\d{10}$/
```

---

## 🚀 How to Run

1. Clone or download the repository
2. Make sure all 3 files are in the **same folder**
3. Open `index.html` in any modern browser

```bash
git clone https://github.com/your-username/online-book-shopping.git
cd online-book-shopping
open index.html
```

> No build tools, no npm, no dependencies — just open and run!

---

## 📱 Responsive Behaviour

| Screen Width | Layout |
|---|---|
| `> 680px` | Logo card + Auth card side by side |
| `≤ 680px` | Logo card hidden; Auth card full width, rounded corners |
| `≤ 380px` | Reduced padding and font sizes for very small screens |

---

## 🛠️ Technologies Used

| Technology | Usage |
|---|---|
| HTML5 | Semantic markup, inline SVG illustration |
| CSS3 | Flexbox layout, CSS variables, keyframe animations, media queries |
| Vanilla JavaScript | DOM manipulation, regex validation, event handling |
| Google Fonts | `Playfair Display` (brand name) + `DM Sans` (body text) |

---

## ✨ Features

- 🔄 Smooth animated tab switching (Login ↔ Signup)
- ✅ Live regex validation on every field
- 👁️ Password show/hide toggle
- 📱 Fully responsive — works on mobile, tablet, desktop
- 🎨 Custom inline SVG illustration — no external image files needed
- 🔔 Toast notification on successful form submission
- 🚫 Zero external libraries or frameworks

---

## 👨‍💻 Author

Made with ❤️ using pure HTML, CSS & JavaScript.