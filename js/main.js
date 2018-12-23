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
const randomer = document.querySelector(".hidden_page-randomer");
const lg = document.querySelector(".lg-heading");
const sm = document.querySelector(".sm-heading");
const data = document.querySelector(".data");
const web = document.querySelector(".web");
const tech = document.querySelectorAll(".tech");
const tech1 = document.querySelectorAll(".tech1");
let pageShown = false;

up_arrow.addEventListener("click", togglePage);
function togglePage() {
  if (!pageShown) {
    up_arrow.classList.add("close");
    hidden.classList.add("show");
    random.classList.add("show");
    randomer.classList.add("show");
    model.classList.add("show1");
    model.classList.add("show");
    rp.classList.add("show");
    lg.classList.add("show");
    sm.classList.add("show");
    data.classList.add("show");
    web.classList.add("show");
    tech.forEach(item => item.classList.add("show"));
    tech1.forEach(item => item.classList.add("show"));
    //Set menu state
    pageShown = true;
  } else {
    up_arrow.classList.remove("close");
    hidden.classList.remove("show");
    random.classList.remove("show");
    randomer.classList.remove("show");
    model.classList.remove("show");
    model.classList.remove("show1");
    rp.classList.remove("show");
    lg.classList.remove("show");
    sm.classList.remove("show");
    data.classList.remove("show");
    web.classList.remove("show");
    tech.forEach(item => item.classList.remove("show"));
    tech1.forEach(item => item.classList.remove("show"));
    //Set menu state
    pageShown = false;
  }
}
