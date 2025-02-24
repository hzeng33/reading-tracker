import { setDiv, enableInput, showLandingPage, setToken } from "./index.js";
import { showReadingTracker } from "./trackerPage.js";

export const handleLogin = () => {
  const loginForm = document.getElementById("login-form");
  const loginEmail = document.getElementById("login-email");
  const loginPassword = document.getElementById("login-password");
  const loginSubmitBtn = document.getElementById("login-submit");
  const loginCancelBtn = document.getElementById("login-cancel");
  const userInfoElement = document.getElementById("user-info");

  loginForm.addEventListener("click", async (e) => {
    if (e.target.nodeName === "BUTTON") {
      if (e.target === loginSubmitBtn) {
        enableInput(false);

        try {
          const response = await fetch("/api/v1/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: loginEmail.value,
              password: loginPassword.value,
            }),
          });

          const data = await response.json();

          if (response.status === 200) {
            userInfoElement.textContent = `Welcome! ${data.user.name}`;

            setToken(data.token);

            loginEmail.value = "";
            loginPassword.value = "";

            showReadingTracker();
          } else {
            alert(data.msg);
          }
        } catch (error) {
          console.error(error);
          alert("A communication error occurred.");
        }

        enableInput(true);
      } else if (e.target === loginCancelBtn) {
        loginEmail.value = "";
        loginPassword.value = "";
        showLandingPage();
      }
    }
  });
};

export const showLoginForm = () => {
  const loginForm = document.getElementById("login-form");
  // Clear any previous values.
  document.getElementById("login-email").value = "";
  document.getElementById("login-password").value = "";
  setDiv(loginForm);
};
