(function lighting() {
  let background = document.querySelector("div.show");
  let button = document.querySelector("span.btn");
  let wishList = document.querySelector("div.wishlist");

  let text = document.querySelector("p.statusText");

  button.onclick = function () {
    background.classList.toggle("on");
    button.classList.toggle("btnMove");
    text.innerHTML = "Here You Go!";
    wishList.classList.toggle("off");
  };
})();
