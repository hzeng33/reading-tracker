export let token = null;
export const setToken = (value) => {
  token = value;
  if (value) {
    localStorage.setItem("token", value);
  } else {
    localStorage.removeItem("token");
  }
};

//// A simple view switcher – assumes each "page" is a container element.
let activeDiv = null;
export const setDiv = (newDiv) => {
  if (activeDiv !== newDiv) {
    if (activeDiv) {
      activeDiv.style.display = "none";
    }
    newDiv.style.display = "flex";
    activeDiv = newDiv;
  }
};

//To show landing page.
export const showLandingPage = () => {
  const landingPage = document.getElementById("landing-page");
  setDiv(landingPage);
};

export let inputEnabled = true;
export const enableInput = (state) => {
  inputEnabled = state;
};

import { showLoginForm, handleLogin } from "./login.js";
import { handleRegister, showRegisterForm } from "./register.js";
import { logOff } from "./logOff.js";
import { showReadingTracker, handleTrackerActions } from "./trackerPage.js";

document.addEventListener("DOMContentLoaded", () => {
  const landingPage = document.getElementById("landing-page");
  activeDiv = landingPage;

  const copyRight = document.getElementById("copy-right");
  const docBtn = document.getElementById("doc-btn");
  const today = new Date();
  const thisYear = today.getFullYear();
  const symbol = "\u00A9";
  copyRight.textContent = `${symbol} Hannah Zeng ${thisYear}.`;

  const loginBtn = document.getElementById("login-btn");
  const registerBtn = document.getElementById("register-btn");
  const logOffBtn = document.getElementById("logoff-btn");

  loginBtn.addEventListener("click", showLoginForm);
  registerBtn.addEventListener("click", showRegisterForm);
  logOffBtn.addEventListener("click", logOff);

  handleLogin();
  handleRegister();
  handleTrackerActions();

  token = localStorage.getItem("token");
  if (token) {
    showReadingTracker();
  } else {
    showLandingPage();
  }
});
