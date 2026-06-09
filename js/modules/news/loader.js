export function showLoader(loader) {
  loader.classList.remove("hidden");
}

export function hideLoader(loader) {
  loader.classList.add("hidden");
}

export function showError(box, message) {
  box.textContent = message;
}

export function clearError(box) {
  box.textContent = "";
}