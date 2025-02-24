// register.js
import { setDiv, enableInput, setToken, showLandingPage } from "./index.js";
import { showLoginForm } from "./login.js";

export function handleRegister() {
  const registerForm = document.getElementById("register-form");
  const nameInput = document.getElementById("reg-name");
  const emailInput = document.getElementById("reg-email");
  const passwordInput = document.getElementById("reg-password");
  const verifyInput = document.getElementById("reg-password2");
  const registerSubmitBtn = document.getElementById("register-submit");
  const registerCancelBtn = document.getElementById("register-cancel");
  const message = document.getElementById("message");

  registerForm.addEventListener("click", async (e) => {
    if (e.target.nodeName === "BUTTON") {
      if (e.target === registerSubmitBtn) {
        if (verifyInput.value !== passwordInput.value) {
          alert("The passwords entered do not match.");
        } else {
          enableInput(false);
          try {
            const response = await fetch("/api/v1/auth/register", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: nameInput.value,
                email: emailInput.value,
                password: passwordInput.value,
              }),
            });
            const data = await response.json();
            if (response.status === 201) {
              alert("Registration successful. Please log in.");
              
              showLoginForm();

              nameInput.value = "";
              emailInput.value = "";
              passwordInput.value = "";
              verifyInput.value = "";
            } else {
              alert(data.msg);
              showLandingPage();
            }
          } catch (error) {
            console.error(error);
            alert("A communication error occurred.");
          }
          enableInput(true);
        }
      } else if (e.target === registerCancelBtn) {
        nameInput.value = "";
        emailInput.value = "";
        passwordInput.value = "";
        verifyInput.value = "";
        showLandingPage();
      }
    }
  });
}

export function showRegisterForm() {
  const registerForm = document.getElementById("register-form");
  // Clear previous values.
  document.getElementById("reg-name").value = "";
  document.getElementById("reg-email").value = "";
  document.getElementById("reg-password").value = "";
  document.getElementById("reg-password2").value = "";
  setDiv(registerForm);
}
