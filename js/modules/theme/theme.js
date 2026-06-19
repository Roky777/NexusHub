// =====================================
//  THEME TOGGLE (global light / dark)
//  The button lives in the dashboard header. Toggling it
//  adds/removes the `dark` class on <html>, which flips the
//  CSS theme tokens (see variables.css). The choice is saved
//  in localStorage so it persists across reloads.
// =====================================

const root = document.documentElement;
const button = document.getElementById("theme-toggle");

function applyTheme(theme) {
  const isDark = theme === "dark";
  root.classList.toggle("dark", isDark);
  if (button) button.textContent = isDark ? "☀️" : "🌙";
}

// Restore the saved theme on load (defaults to light).
applyTheme(localStorage.getItem("theme") || "light");

button?.addEventListener("click", () => {
  const next = root.classList.contains("dark") ? "light" : "dark";
  localStorage.setItem("theme", next);
  applyTheme(next);
});
