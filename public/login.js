// login.js
import { setDiv } from "./index.js";

const loginForm = document.getElementById("login-form");
const loginSubmit = document.getElementById("login-submit");

loginSubmit.addEventListener("click", async () => {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const response = await fetch("localhost:3000/api/auth/login", {
      method: "POST",
      credentials: "include", // sends cookies automatically
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      // Update UI to show tracker page and user info
      document.getElementById("user-info").style.display = "flex";
      document.getElementById("user-name").textContent = data.user.name;
      setDiv(document.getElementById("tracker-page"));

      // Optionally, trigger a books refresh if you have one.
      // import { fetchBooks } from "./books.js";
      // fetchBooks();
    } else {
      console.error("Login failed");
    }
  } catch (error) {
    console.error("Error during login:", error);
  }
});
