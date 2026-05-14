const modernVisual = document.querySelector(".login-visual-modern");
const availableBackgrounds = ["1", "2", "3", "4"];

if (modernVisual) {
  const randomBackground = availableBackgrounds[Math.floor(Math.random() * availableBackgrounds.length)];
  modernVisual.dataset.background = randomBackground;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const loginForms = [
  {
    email: document.querySelector("#email"),
    password: document.querySelector("#password"),
    button: document.querySelector("#next-button"),
    emailError: document.querySelector("#email-error"),
    passwordError: document.querySelector("#password-error")
  },
  {
    email: document.querySelector("#legacy-email"),
    password: document.querySelector("#legacy-password"),
    button: document.querySelector("#legacy-next-button"),
    emailError: document.querySelector("#legacy-email-error"),
    passwordError: document.querySelector("#legacy-password-error")
  }
];

const validateLoginForm = ({ email, password, button, emailError, passwordError }) => {
  if (!email || !password || !button) {
    return;
  }

  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const isEmailValid = emailPattern.test(emailValue);
  const isPasswordValid = passwordValue.length > 0;

  button.disabled = !(isEmailValid && isPasswordValid);

  if (emailError) {
    emailError.hidden = emailValue.length === 0 || isEmailValid;
  }

  if (passwordError) {
    passwordError.hidden = passwordValue.length === 0 || isPasswordValid;
  }
};

loginForms.forEach((form) => {
  if (!form.email || !form.password) {
    return;
  }

  [form.email, form.password].forEach((input) => {
    input.addEventListener("input", () => validateLoginForm(form));
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

const registerPage = document.querySelector(".register-page");
const stepOneButton = document.querySelector("#register-step-one-button");
const acceptRules = document.querySelector("#accept-rules");
const registerVisual = document.querySelector(".register-visual");
const registerStepOne = document.querySelector('[data-step="1"]');
const registerStepTwo = document.querySelector('[data-step="2"]');
const registerWelcomeStep = document.querySelector('[data-step="3"]');
const registerForm = document.querySelector(".register-form");
const registerEmail = document.querySelector("#register-email");
const registerEmailError = document.querySelector("#register-email-error");
const registerPassword = document.querySelector("#register-password");
const registerPasswordError = document.querySelector("#register-password-error");
const confirmPassword = document.querySelector("#confirm-password");
const confirmPasswordError = document.querySelector("#confirm-password-error");
const stepTwoButton = document.querySelector("#register-step-two-button");
const recoveryForm = document.querySelector(".recovery-form");
const recoveryEmail = document.querySelector("#recovery-email");
const recoveryEmailError = document.querySelector("#recovery-email-error");
const recoveryButton = document.querySelector("#recovery-button");

if (acceptRules && stepOneButton) {
  acceptRules.addEventListener("change", () => {
    stepOneButton.disabled = !acceptRules.checked;
  });
}

if (stepOneButton && registerPage && registerStepOne && registerStepTwo && registerVisual) {
  stepOneButton.addEventListener("click", () => {
    registerPage.dataset.registerStep = "2";
    registerVisual.dataset.stepVisual = "2";
    registerStepOne.hidden = true;
    registerStepOne.classList.remove("is-active");
    registerStepTwo.hidden = false;
    registerStepTwo.classList.add("is-active");

    if (registerEmail) {
      registerEmail.focus();
    }
  });
}

const validateRegisterStepTwo = () => {
  if (!registerEmail || !registerPassword || !confirmPassword || !stepTwoButton) {
    return;
  }

  const emailValue = registerEmail.value.trim();
  const passwordValue = registerPassword.value.trim();
  const confirmValue = confirmPassword.value.trim();
  const isEmailValid = emailPattern.test(emailValue);
  const isPasswordValid = passwordValue.length >= 8;
  const passwordsMatch = confirmValue.length > 0 && passwordValue === confirmValue;

  stepTwoButton.disabled = !(isEmailValid && isPasswordValid && passwordsMatch);

  if (registerEmailError) {
    registerEmailError.hidden = emailValue.length === 0 || isEmailValid;
  }

  if (registerPasswordError) {
    registerPasswordError.hidden = passwordValue.length === 0 || isPasswordValid;
  }

  if (confirmPasswordError) {
    confirmPasswordError.hidden = confirmValue.length === 0 || passwordsMatch;
  }
};

[registerEmail, registerPassword, confirmPassword].forEach((input) => {
  if (input) {
    input.addEventListener("input", validateRegisterStepTwo);
  }
});

document.querySelectorAll(".password-toggle").forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const inputId = toggle.getAttribute("aria-controls");
    const passwordInput = inputId ? document.querySelector(`#${inputId}`) : null;

    if (!passwordInput) {
      return;
    }

    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    toggle.setAttribute("aria-label", isPassword ? "Ocultar contraseña" : "Mostrar contraseña");
  });
});

if (registerForm) {
  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    validateRegisterStepTwo();

    if (stepTwoButton && stepTwoButton.disabled) {
      return;
    }

    if (registerPage && registerStepTwo && registerWelcomeStep) {
      registerPage.dataset.registerStep = "3";

      if (registerVisual) {
        registerVisual.dataset.stepVisual = "3";
      }

      registerStepTwo.hidden = true;
      registerStepTwo.classList.remove("is-active");
      registerWelcomeStep.hidden = false;
      registerWelcomeStep.classList.add("is-active");
    }
  });
}

const validateRecoveryForm = () => {
  if (!recoveryEmail || !recoveryButton) {
    return;
  }

  const emailValue = recoveryEmail.value.trim();
  const isEmailValid = emailPattern.test(emailValue);

  recoveryButton.disabled = !isEmailValid;

  if (recoveryEmailError) {
    recoveryEmailError.hidden = emailValue.length === 0 || isEmailValid;
  }
};

if (recoveryEmail) {
  recoveryEmail.addEventListener("input", validateRecoveryForm);
}

if (recoveryForm) {
  recoveryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    validateRecoveryForm();
  });
}
