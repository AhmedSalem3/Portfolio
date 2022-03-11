import { debounce, navBar, header } from "../modules/functions.js";

header();
//
// function for scrolling to top btn
function scrollToTop() {
  let btn = document.querySelector("span.to-top");

  window.addEventListener("scroll", debounce(showBtn));

  function showBtn() {
    window.scrollY >= 1200
      ? (btn.style.opacity = "1")
      : (btn.style.opacity = "0");
  }

  btn.addEventListener("click", function () {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: "smooth",
    });
  });
}
scrollToTop();
//
// function for opening the menu

navBar();
//
// function for books section
function books() {
  let moreBtn = document.querySelector(".books button.show-more");
  let allBooks = document.querySelectorAll(".books .book");
  let booksToHide = Array.from(allBooks).slice(4);
  booksToHide.forEach((ele) => (ele.style.display = "none"));

  //showing all books on clicking

  moreBtn.onclick = function () {
    booksToHide.forEach((ele) => (ele.style.display = "flex"));
  };
}
books();
//
// function for the lighting section to toggle the wishlist display
function lighting() {
  let background = document.querySelector("div.show");
  let button = document.querySelector("span.btn");
  let wishList = document.querySelector("div.wishlist");

  let text = document.querySelector("p.statusText");

  button.onclick = function () {
    background.classList.toggle("on");
    button.classList.toggle("btnMove");
    if (text.textContent === "Discover My WishList") {
      text.innerHTML = "Here You Go!";
    } else {
      text.innerHTML = "Discover My WishList";
    }
    wishList.classList.toggle("off");
  };
}
lighting();

// function that adds slidein animation to any element
function slideInAnimations() {
  let qualifications = document.querySelector(".qualifications-content");
  let books = document.querySelector(".books-content");
  let wishList = document.querySelector(".wishlist-content");

  let scrollSections = [qualifications, books, wishList];

  // addding scrolled out classes
  scrollSections.forEach((section) => {
    section.classList.add("scrolledOut");
  });

  // this is the observer which will toggle the scrolling classes
  let observer = new IntersectionObserver((enteries) => {
    enteries.forEach((entry) => {
      entry.isIntersecting ? entry.target.classList.remove("scrolledOut") : "";
    });
  });

  scrollSections.forEach((section) => {
    observer.observe(section);
  });
}
slideInAnimations();

// setting my projects from the JSON file to HTML
function getProjects() {
  async function projectsData() {
    let response = await fetch("brief-projects.json");

    let data = await response.json();

    embedProjects(data);
  }
  projectsData();

  function embedProjects(projects) {
    let projectHolder = document.querySelector(
      ".projects .container .projects-content"
    );

    projects.forEach((project) => {
      let { link, image, description, languages, title, category, createdOn } =
        project;

      let projectHTML = `
      <a class="project ${category}" href=${link} target="_blank" >
      <div class="image">
          <img src=${image} alt="project">
          </div>
          <div class="text">
              <h3>${title}</h3>
              <p>${description}</p>
              <div class="details">
                  <div class="languages">
                      <ion-icon name="time-outline"></ion-icon> ${languages}
                  </div>
                  <div class="date">
                      ${createdOn}
                  </div>
              </div>
          </div>
      </div>
  </a>
      `;
      projectHolder.innerHTML += projectHTML;
    });
  }
}
getProjects();

//
