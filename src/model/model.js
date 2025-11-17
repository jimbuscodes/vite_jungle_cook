import { initListeners, attachHamburgerListener } from "../app/app.js";
import home from "/src/pages/home.js";
import login from "/src/pages/login.js";

// function to change page
export function changePage(pageName) {
  const page = pageName === "" || !pageName ? "home" : pageName;

  const pages = {
    home: home,
    login: login,
  };

  const pageContent = pages[page];

  if (pageContent) {
    document.querySelector("#app").innerHTML = pageContent;
    initListeners();
    attachHamburgerListener();
  } else {
    console.error(`Page "${page}" not found, loading home`);
    document.querySelector("#app").innerHTML = home;
    initListeners();
    attachHamburgerListener();
  }
  /*
  const page = pageName === "" ? "home" : pageName;

  fetch(`src/pages/${page}.html`)
    .then((response) => {
      if (!response.ok) throw new Error("Page not found");
      return response.text();
    })
    .then((html) => {
      const app = document.getElementById("app");
      if (app) {
        app.innerHTML = html;
        initListeners();
        attachHamburgerListener();
      }
    })
    .catch((error) => console.error("Error loading page:", error));
    */
}
