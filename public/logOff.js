import { setToken, showLandingPage } from "./index.js";

export function logOff() {
  setToken(null);

  //Clear name
  const userName = document.getElementById("user-info");
  userName.textContent = "Welcome!";

  // Clear the tracker table content
  const trackerTable = document.getElementById("trackerTable");
  if (trackerTable) {
    trackerTable.innerHTML = "";
  }

  showLandingPage();
}
