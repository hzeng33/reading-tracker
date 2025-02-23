/**Create and add a footer */
const footer = document.createElement("footer");
const today = new Date();
const thisYear = today.getFullYear();
const copyRight = document.createElement("p");
const symbol = "\u00A9";
copyRight.textContent = `${symbol} Hannah Zeng ${thisYear}.`;
footer.appendChild(copyRight);
document.body.appendChild(footer);

let activeDiv = null;
export const setDiv = (newDiv) => {
  if (newDiv != activeDiv) {
    if (activeDiv) {
      activeDiv.style.display = "none";
    }
    newDiv.style.display = "flex";
    activeDiv = newDiv;
  }
};

export let inputEnabled = true;
export const enableInput = (state) => {
  inputEnabled = state;
};

export let token = null;
export const setToken = (value) => {
  token = value;
  if (value) {
    localStorage.setItem("token", value);
  } else {
    localStorage.removeItem("token");
  }
};

export let message = null;

const landingPage = document.getElementById("landing-page");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");
const loginCancelBtn = document.getElementById("login-cancel");
const registerCancelBtn = document.getElementById("register-cancel");

export const showLoginForm = () => {
  setDiv(loginForm);
};

export const showRegisterForm = () => {
  setDiv(registerForm);
};

export const showLandingPage = () => {
  setDiv(landingPage);
};

document.addEventListener("DOMContentLoaded", () => {
  activeDiv = landingPage;
  token = localStorage.getItem("token");
  message = document.getElementById("message");
  loginBtn.addEventListener("click", () => {
    showLoginForm();
  });
  registerBtn.addEventListener("click", () => {
    showRegisterForm();
  });
  loginCancelBtn.addEventListener("click", () => {
    showLandingPage();
  });
  registerCancelBtn.addEventListener("click", () => {
    showLandingPage();
  });
  if (token) {
    showBooks();
  } else {
    showLandingPage();
  }
});
