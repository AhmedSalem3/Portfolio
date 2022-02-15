function header() {
  let header = document.querySelector("header");

  window.addEventListener("scroll", check);

  let lastScrollY = 0;
  function check() {
    let scrollTop = document.documentElement.scrollTop;
    if (lastScrollY < scrollTop) {
      header.style.top = "-100%";
    } else {
      header.style.top = "0";
    }
    lastScrollY = scrollTop;
  }
}
header();
//
//
function scrollToTop() {
  let btn = document.querySelector("span.to-top");

  window.onscroll = function () {
    if (window.scrollY >= 1200) {
      btn.style.opacity = "1";
    } else {
      btn.style.opacity = "0";
    }
  };

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
//
function navBar() {
  let btn = document.querySelector("header nav .menu");
  let menu = document.querySelector("header nav ul");
  let menuLis = document.querySelectorAll("header nav ul li");

  btn.onclick = function () {
    menu.classList.toggle("active");
    document.body.classList.toggle("menu-on");
    this.classList.toggle("active");

    menu.onclick = function () {
      if (menu.classList.contains("active")) {
        menu.classList.remove("active");
        document.body.classList.remove("menu-on");
        btn.classList.remove("active");
      }
    };
  };

  let menuLinks = document.querySelectorAll("header nav ul li a");

  menuLinks.forEach((ele) => {
    ele.onmouseover = function () {
      menuLinks.forEach((e) => e.classList.remove("active"));
      this.classList.add("active");
    };
    ele.onmouseout = function () {
      menuLinks.forEach((e) => e.classList.remove("active"));
      menuLinks[0].classList.add("active");
    };
  });
}
navBar();
//
//
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
//
function lighting() {
  let background = document.querySelector("div.show");
  let button = document.querySelector("span.btn");
  let wishList = document.querySelector("div.wishlist");

  let text = document.querySelector("p.statusText");

  button.onclick = function () {
    background.classList.toggle("on");
    button.classList.toggle("btnMove");
    if (text.textContent === "Discover My WishList (Turn the button on)") {
      text.innerHTML = "Here You Go!";
    } else {
      text.innerHTML = "Discover My WishList (Turn the button on)";
    }
    wishList.classList.toggle("off");
  };
}
lighting();

//
function photo() {
  const section = document.querySelector(".about");
  const image = document.querySelector(".about img");
  let imageHolder = document.querySelector(".about .container");

  function slideIn() {
    const distanceFromTop =
      image.scrollTop + image.getBoundingClientRect().height / 1.4;
    const windowsScroll = window.scrollY;

    if (windowsScroll >= distanceFromTop) {
      image.classList.add("slide");
    }
  }

  window.addEventListener("scroll", slideIn);
}
photo();

//
function slideInAnimation() {
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
slideInAnimation();

// setting my projects from the JSON file to HTML
function getProjects() {
  async function projectsData() {
    let response = await fetch("projects.json");

    let data = await response.json();

    embedProjects(data);
  }
  projectsData();

  function embedProjects(projects) {
    let projectHolder = document.querySelector(
      ".projects .container .projects-content"
    );
    console.log(projectHolder);

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
