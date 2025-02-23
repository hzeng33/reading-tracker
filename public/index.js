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

import { showBooks, handleBooks, handleAddEdit } from "./books.js";
import { handleLogin, showLoginForm } from "./login.js";
import { handleRegister, showRegisterForm } from "./register.js";

const landingPage = document.getElementById("landing-page");
const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");

export const showLandingPage = () => {
  setDiv(landingPage);
};

document.addEventListener("DOMContentLoaded", () => {
  activeDiv = landingPage;
  token = localStorage.getItem("token");
  message = document.getElementById("message");
  loginBtn.addEventListener("click", showLoginForm);
  handleLogin();
  registerBtn.addEventListener("click", showRegisterForm);
  handleRegister();
  handleBooks();
  handleAddEdit();
  if (token) {
    showBooks();
  } else {
    showLandingPage();
  }
});
