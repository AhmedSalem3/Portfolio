// function that reduces the time a function is called (performance inquires)
function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function navBar() {
  let btn = document.querySelector("header nav .menu");
  let menu = document.querySelector("header nav ul");
  let menuLis = document.querySelectorAll("header nav ul li");

  btn.addEventListener("click", openMenu);

  function openMenu(e) {
    e.stopPropagation();
    menu.classList.toggle("active");
    setTimeout(() => menu.classList.toggle("opacity-on"), 150);
    document.body.classList.toggle("menu-on");
    this.classList.toggle("active");

    document.addEventListener("click", closeMenu);
  }

  function closeMenu(e) {
    menu.classList.remove("active", "opacity-on");
    document.body.classList.remove("menu-on");
    btn.classList.remove("active");
  }
}

function header() {
  let header = document.querySelector("header");

  window.addEventListener("scroll", checkToShowNav);

  let lastScrollY = 0;
  function checkToShowNav() {
    let scrollTop = document.documentElement.scrollTop;
    if (lastScrollY < scrollTop) {
      header.style.top = "-100%";
    } else {
      header.style.top = "0";
    }
    lastScrollY = scrollTop;
  }
}

export { debounce, navBar, header };
