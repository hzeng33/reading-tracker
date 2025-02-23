import {
  setDiv,
  inputEnabled,
  enableInput,
  token,
  message,
  showLandingPage,
  setToken,
} from "./index.js";
import { showBooks } from "./books.js";

let loginForm = null;
let email = null;
let password = null;
let userName = null;

export const handleLogin = () => {
  loginForm = document.getElementById("login-form");
  email = document.getElementById("login-email");
  password = document.getElementById("login-password");
  userName = document.getElementById("user-name");
  const loginSubmitBtn = document.getElementById("login-submit");
  const loginCancelBtn = document.getElementById("login-cancel");

  loginForm.addEventListener("click", async (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === loginSubmitBtn) {
        enableInput(false);

        try {
          const response = await fetch("/api/v1/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email.value,
              password: password.value,
            }),
          });

          const data = await response.json();
          console.log(data);
          if (response.status === 200) {
            userName.textContent = data.user.name;
            setToken(data.token);

            email.value = "";
            password.value = "";

            showBooks();
          } else {
            message.textContent = data.msg;
          }
        } catch (error) {
          console.error(error);
          message.textContent = "A communication error occurred.";
        }

        enableInput(true);
      } else if (e.target === loginCancelBtn) {
        email.value = "";
        password.value = "";
        showLandingPage();
      }
    }
  });
};

export const showLoginForm = () => {
  email.value = null;
  password.value = null;
  setDiv(loginForm);
};
