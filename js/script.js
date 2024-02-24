const $ = (selector) => {
  return document.querySelector(selector);
};
const $All = (selector) => {
  return document.querySelectorAll(selector);
};
const $last = (arr) => arr[arr.length - 1];
let savedHTML = "";
const next = () => {
  if ($All(".g-hide").length >= 1) {
    savedHTML = $All(".g-hide")[0].innerHTML;
    $All(".g-hide")[0].remove();
  }

  if ($(".g-prev")) {
    $(".g-prev").classList.add("g-hide");
    $(".g-prev").classList.remove("g-prev");
  }

  $(".g-act").classList.add("g-prev");
  $(".g-act").classList.remove("g-act");

  $(".g-next").classList.add("g-act");
  $(".g-next").classList.remove("g-next");

  $(".g-new-next").classList.remove("g-new-next");

  const addedEl = document.createElement("li");

  $(".g-list").appendChild(addedEl);
  addedEl.classList.add("g-next", "g-new-next");
  addedEl.innerHTML = savedHTML;
};
const prev = () => {
  savedHTML = $(".g-new-next").innerHTML;

  $(".g-new-next").remove();

  $(".g-next").classList.add("g-new-next");

  $(".g-act").classList.add("g-next");
  $(".g-act").classList.remove("g-act");

  $(".g-prev").classList.add("g-act");
  $(".g-prev").classList.remove("g-prev");

  $last($All(".g-hide")).classList.add("g-prev");
  $last($All(".g-hide")).classList.remove("g-hide");

  const addedEl = document.createElement("li");

  $(".g-list").insertBefore(addedEl, $(".g-list").firstChild);
  addedEl.classList.add("g-hide");
  addedEl.innerHTML = savedHTML;
};

const gSlide = (element) => {
  if (element.closest(".g-next")) {
    next();
  } else if (element.closest(".g-prev")) {
    prev();
  }
};

const gSlider = $(".g-list");

gSlider.onclick = (event) => {
  gSlide(event.target);
};

let distY,
  distX,
  startX,
  startY,
  startTime,
  treshold = 100,
  restraint = 150,
  allowedTime = 500,
  elapsedTime;

const touchStart = (e) => {
  startX = e.changedTouches[0].pageX;
  startY = e.changedTouches[0].pageY;
  startTime = new Date().getTime();
  e.preventDefault();
};

const touchEnd = (e) => {
  distX = e.changedTouches[0].pageX - startX;
  distY = e.changedTouches[0].pageY - startY;
  elapsedTime = new Date().getTime() - startTime;
  if (elapsedTime <= allowedTime) {
    if (
      Math.abs(distX) >= Math.abs(treshold) &&
      Math.abs(distY) <= Math.abs(restraint)
    ) {
      distX < 0 ? next() : prev();
    } else if (
      Math.abs(distX) <= Math.abs(treshold) &&
      Math.abs(distY) <= Math.abs(restraint)
    ) {
      gSlide(e.target);
    }
  }
  e.preventDefault();
};

gSlider.addEventListener("touchstart", (e) => touchStart(e), false);
gSlider.addEventListener("touchmove", (e) => e.preventDefault(), false);
gSlider.addEventListener("touchend", (e) => touchEnd(e), false);
