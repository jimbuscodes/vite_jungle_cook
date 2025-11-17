import { changePage } from "../model/model.js";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBN6ceHeYNnR6tYdM-gW_sAdLzo5-DN54I",
  authDomain: "webdev-class-setup.firebaseapp.com",
  projectId: "webdev-class-setup",
  storageBucket: "webdev-class-setup.firebasestorage.app",
  messagingSenderId: "187086770371",
  appId: "1:187086770371:web:2737b950e7015cc0a4d276",
  measurementId: "G-ST1HN1H3W9",
};

// initialize firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
let canSeeInfo = false;

// listeners
export function initListeners() {
  // authentication change listener
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User is signed in: ", user.email);
      canSeeInfo = true;
      updateNavForAuth(user);
      updateLoginButton(true);
    } else {
      console.log("No user signed in");
      canSeeInfo = false;
      updateNavForAuth(null);
      updateLoginButton(false);
    }
  });

  // login button
  const loginBtn = document.getElementById("loginBtn");
  if (loginBtn) {
    loginBtn.onclick = () => {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log("User Signed in");
        })
        .catch((error) => {
          console.error("Error signing in: ", error);
        });
    };
  }

  // sign up button
  const signupBtn = document.getElementById("signupBtn");
  if (signupBtn) {
    signupBtn.onclick = () => {
      const email = document.getElementById("newEmail").value;
      const password = document.getElementById("newPassword").value;
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log("User signed up successfully");
        })
        .catch((error) => {
          console.error("Error signing up: ", error);
        });
    };
  }

  /*
  function updateLoginButton(loggedIn) {
    const loginLink = document.getElementById("login");
    if (!loginLink) return;

    loginLink.textContent = loggedIn ? "Logout" : "Login";

    loginLink.onclick = loggedIn
      ? () => signOut(getAuth()).then(() => console.log("signed out"))
      : null;
  }
  */

  function updateLoginButton(loggedIn) {
    const desktopLogin = document.getElementById("login-desktop");
    const mobileLogin = document.getElementById("login-mobile");

    [desktopLogin, mobileLogin].forEach((loginLink) => {
      if (!loginLink) return;

      loginLink.textContent = loggedIn ? "Logout" : "Login";

      loginLink.onclick = loggedIn
        ? () => signOut(getAuth()).then(() => console.log("signed out"))
        : null;
    });
  }

  /*
  function updateNavForAuth(user) {
    const navList = document.querySelector("nav ul");
    const mobileMenu = document.querySelector(".mobile-menu");

    navList?.querySelector("#yourRecipesLink")?.remove();
    mobileMenu?.querySelector("#yourRecipesLinkMobile")?.remove();

    if (user) {
      const yourRecipesItem = document.createElement("li");
      yourRecipesItem.innerHTML = `<a id="yourRecipesLink" href="#your_recipes">Your Recipes</a>`;

      const yourRecipesItemMobile = document.createElement("li");
      yourRecipesItemMobile.innerHTML = `<a id="yourRecipesLinkMobile" href="#your_recipes">Your Recipes</a>`;

      const loginItem = navList?.querySelector("#login")?.parentElement;
      const loginItemMobile =
        mobileMenu?.querySelector("#login")?.parentElement;

      if (loginItem) navList.insertBefore(yourRecipesItem, loginItem);
      if (loginItemMobile)
        mobileMenu.insertBefore(yourRecipesItemMobile, loginItemMobile);
    }
  }
 */
  function updateNavForAuth(user) {
    const navList = document.querySelector("nav ul");
    const mobileMenu = document.querySelector(".mobile-menu");

    // remove old links
    navList?.querySelector("#yourRecipesLink")?.remove();
    mobileMenu?.querySelector("#yourRecipesLinkMobile")?.remove();

    if (user) {
      const yourRecipesItem = document.createElement("li");
      yourRecipesItem.innerHTML = `<a id="yourRecipesLink" href="#your_recipes">Your Recipes</a>`;

      const yourRecipesItemMobile = document.createElement("li");
      yourRecipesItemMobile.innerHTML = `<a id="yourRecipesLinkMobile" href="#your_recipes">Your Recipes</a>`;

      const loginItem = navList?.querySelector("#login-desktop")?.parentElement;
      const loginItemMobile =
        mobileMenu?.querySelector("#login-mobile")?.parentElement;

      if (loginItem) navList.insertBefore(yourRecipesItem, loginItem);
      if (loginItemMobile)
        mobileMenu.insertBefore(yourRecipesItemMobile, loginItemMobile);
    }
  }

  attachHamburgerListener();
}

// routing function
function route() {
  const hashTag = window.location.hash;
  const pageID = hashTag.replace("#", "");
  changePage(pageID);
}

// start routing
function initRouting() {
  window.addEventListener("hashchange", route);
  route();
}

document.addEventListener("DOMContentLoaded", () => {
  initRouting();
});

// mobile nav
export function attachHamburgerListener() {
  const hamburger = document.getElementById("hamburger-icon");
  if (!hamburger) return;

  hamburger.onclick = () => {
    console.log("clicked");
    hamburger.classList.toggle("open");
  };
}
