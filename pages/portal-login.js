const usernameFields = [
  {
    input: document.querySelector("#username"),
    button: document.querySelector("#next-button"),
    error: document.querySelector("#username-error")
  },
  {
    input: document.querySelector("#legacy-username"),
    button: document.querySelector("#legacy-next-button"),
    error: document.querySelector("#legacy-username-error")
  }
];

const modernVisual = document.querySelector(".login-visual-modern");
const availableBackgrounds = ["1", "2", "3", "4"];

if (modernVisual) {
  const randomBackground = availableBackgrounds[Math.floor(Math.random() * availableBackgrounds.length)];
  modernVisual.dataset.background = randomBackground;
}

const usernamePattern = /^(CC|CE|NI|TI|PE)\d+$/i;

usernameFields.forEach(({ input, button, error }) => {
  if (!input || !button || !error) {
    return;
  }

  input.addEventListener("input", () => {
    const value = input.value.trim();
    const isValid = usernamePattern.test(value);

    button.disabled = !isValid;
    error.hidden = value.length === 0 || isValid;
  });
});

const forgotButton = document.querySelector("#forgot-button");
const forgotMenu = document.querySelector("#forgot-menu");

if (forgotButton && forgotMenu) {
  forgotButton.addEventListener("click", () => {
    const isOpen = forgotButton.getAttribute("aria-expanded") === "true";

    forgotButton.setAttribute("aria-expanded", String(!isOpen));
    forgotMenu.hidden = isOpen;
  });
}
