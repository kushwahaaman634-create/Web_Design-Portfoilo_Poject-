// Feature 1: mobile navigation menu
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", open);
});
navLinks.addEventListener("click", (e) => {
  if (e.target.tagName === "A") navLinks.classList.remove("open");
});

// Feature 2: dark / light theme switch (remembered in this browser)
const root = document.documentElement;
const themeBtn = document.getElementById("themeBtn");
function setTheme(mode) {
  root.setAttribute("data-theme", mode);
  themeBtn.textContent = mode === "dark" ? "Light mode" : "Dark mode";
  try { localStorage.setItem("theme", mode); } catch (e) {}
}
let saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) {}
setTheme(saved || "light");
themeBtn.addEventListener("click", () => {
  setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
});

// Feature 3: typing effect in the hero
const phrases = ["BCA student", "cybersecurity learner", "TryHackMe player", "future defender"];
const typed = document.getElementById("typed");
let p = 0, c = 0, deleting = false;
function type() {
  const word = phrases[p];
  c += deleting ? -1 : 1;
  typed.textContent = word.slice(0, c);
  let delay = deleting ? 50 : 100;
  if (!deleting && c === word.length) { deleting = true; delay = 1400; }
  else if (deleting && c === 0) { deleting = false; p = (p + 1) % phrases.length; delay = 400; }
  setTimeout(type, delay);
}
type();

// Feature 4: contact form validation
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");
function showError(field, msg) {
  document.querySelector(`.err[data-for="${field.id}"]`).textContent = msg;
  field.classList.toggle("invalid", Boolean(msg));
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.name, email = form.email, message = form.message;
  let ok = true;
  showError(name, "");  showError(email, "");  showError(message, "");

  if (name.value.trim().length < 2) { showError(name, "Enter your name (at least 2 characters)."); ok = false; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) { showError(email, "Enter a valid email, like name@example.com."); ok = false; }
  if (message.value.trim().length < 10) { showError(message, "Write at least 10 characters."); ok = false; }

  if (!ok) { status.textContent = ""; return; }

  // TODO (Step 4): save { name, email, message, createdAt } to a Firestore "messages" collection here.
  status.textContent = "Looks good. (Firebase saving gets added in Step 4.)";
  form.reset();
});
