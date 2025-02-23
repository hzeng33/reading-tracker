import {
  setDiv,
  inputEnabled,
  message,
  token,
  setToken,
  enableInput,
  showLandingPage,
} from "./index.js";
import { showLoginForm } from "./login.js";

let registerForm = null;
let name = null;
let registerEmail = null;
let registerPassword = null;
let verifyPassword = null;

export const handleRegister = () => {
  registerForm = document.getElementById("register-form");
  name = document.getElementById("reg-name");
  registerEmail = document.getElementById("reg-email");
  registerPassword = document.getElementById("reg-password");
  verifyPassword = document.getElementById("reg-password2");
  const registerSubmitBtn = document.getElementById("register-submit");
  const registerCancelBtn = document.getElementById("register-cancel");

  registerForm.addEventListener("click", async (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === registerSubmitBtn) {
        if (verifyPassword.value != registerPassword.value) {
          message.textContent = "The passwords entered do not match.";
        } else {
          enableInput(false);

          try {
            const response = await fetch("/api/v1/auth/register", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: name.value,
                email: registerEmail.value,
                password: registerPassword.value,
              }),
            });

            const data = await response.json();
            if (response.status === 201) {
              message.textContent = "Registration successful. Please log in.";
              showLoginForm();
              setToken(data.token);

              name.value = "";
              registerEmail.value = "";
              registerPassword.value = "";
              verifyPassword.value = "";
            } else {
              showLandingPage();
              message.textContent = data.msg;
            }
          } catch (error) {
            console.error(error);
            message.textContent = "A communication error occurred.";
          }

          enableInput(true);
        }
      } else if (e.target === registerCancelBtn) {
        name.value = "";
        registerEmail.value = "";
        registerPassword.value = "";
        verifyPassword.value = "";
        showLandingPage();
      }
    }
  });
};

export const showRegisterForm = () => {
  name.value = null;
  registerEmail.value = null;
  registerPassword.value = null;
  verifyPassword.value = null;
  setDiv(registerForm);
};
