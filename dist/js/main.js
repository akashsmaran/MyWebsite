//Select DOM items
const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");
const menuNav = document.querySelector(".menu-nav");
const menuBranding = document.querySelector(".menu-branding");

const navItems = document.querySelectorAll(".nav-item");

//Init State of Menu
let showMenu = false;

menuBtn.addEventListener("click", toggleMenu);

function toggleMenu() {
  if (!showMenu) {
    menuBtn.classList.add("close");
    menu.classList.add("show");
    menuNav.classList.add("show");
    menuBranding.classList.add("show");
    navItems.forEach(item => item.classList.add("show"));

    //Set menu state
    showMenu = true;
  } else {
    menuBtn.classList.remove("close");
    menu.classList.remove("show");
    menuNav.classList.remove("show");
    menuBranding.classList.remove("show");
    navItems.forEach(item => item.classList.remove("show"));

    //Set menu state
    showMenu = false;
  }
}

const hidden = document.querySelector(".hidden_page");
const random = document.querySelector(".hidden_page-random");
const model = document.querySelector(".hidden_page-model");
const up_arrow = document.querySelector(".up-arrow");
const rp = document.querySelector(".rp");

let pageShown = false;

up_arrow.addEventListener("click", togglePage);
function togglePage() {
  if (!pageShown) {
    up_arrow.classList.add("close");
    hidden.classList.add("show");
    random.classList.add("show");
    model.classList.add("show1");
    model.classList.add("show");
    rp.classList.add("show");
    //Set menu state
    pageShown = true;
  } else {
    up_arrow.classList.remove("close");
    hidden.classList.remove("show");
    random.classList.remove("show");
    model.classList.remove("show");
    model.classList.remove("show1");
    rp.classList.remove("show");
    //Set menu state
    pageShown = false;
  }
}
