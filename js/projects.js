import { navBar, header } from "../modules/functions.js";
// function for toggling menu

navBar();
header();

// fetching projects
async function projects() {
  let response = await fetch("../all-projects.json");
  let data = await response.json();
  console.log(data);

  let projectsHolder = document.querySelector("[data-projects]");

  data.forEach((project) => {
    createProject(project, projectsHolder);
  });

  startObserving();
}
projects();

function createProject(project, parentToAppend) {
  let { description: des, title, image: projectImg, link } = project;

  let holder = document.createElement("div");
  holder.className = "project";

  let imageDiv = createImg(projectImg);
  let descriptionDiv = createDes({
    projectDes: des,
    projectTitle: title,
    projectLink: link,
  });

  holder.appendChild(imageDiv);
  holder.appendChild(descriptionDiv);

  parentToAppend.appendChild(holder);

  // functions that builds the components of the project
  function createImg(src) {
    let ImageHolder = document.createElement("div");
    ImageHolder.className = "image";

    let imageTag = document.createElement("img");
    imageTag.setAttribute("loading", "lazy");
    imageTag.src = src;

    ImageHolder.appendChild(imageTag);

    return ImageHolder;
  }

  function createDes({ projectTitle, projectDes, projectLink }) {
    let holder = document.createElement("div");
    holder.className = "description";

    let title = document.createElement("div");
    title.className = "title";
    title.textContent = projectTitle;
    holder.appendChild(title);

    let info = document.createElement("div");
    info.className = "info";
    info.textContent = projectDes;
    holder.appendChild(info);

    let linkBtn = document.createElement("a");
    linkBtn.className = "view";
    linkBtn.href = projectLink;
    linkBtn.textContent = "View Project";
    linkBtn.setAttribute("target", "_blank");
    holder.appendChild(linkBtn);

    return holder;
  }
}

function startObserving() {
  let observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("scrolled-out", !entry.isIntersecting);
      });
    },
    {
      threshold: 0.5,
    }
  );

  let allProjects = document.querySelectorAll(".project");
  console.log(allProjects);

  allProjects.forEach((project) => observer.observe(project));
}
