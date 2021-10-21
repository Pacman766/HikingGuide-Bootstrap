// Раскрывающийся текст
function readMore() {
  let dots = document.getElementById("dots");
  let readMore = document.getElementById("read_more");
  let readMoreBtn = document.getElementById("read_more_btn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    readMore.style.display = "none";
    readMoreBtn.innerHTML = "read more";
  } else {
    dots.style.display = "none";
    readMore.style.display = "inline";
    readMoreBtn.innerHTML = "less";
  }
}

// Прокрутка вниз
const offset = 100;
const scrollUp = document.querySelector(".scroll-up");
const scrollUpSvgPath = document.querySelector(".scroll-up__svg-path");
const pathLength = scrollUpSvgPath.getTotalLength();

scrollUpSvgPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
scrollUpSvgPath.style.transition = "stroke-dashoffset 20ms";

const getTop = () => window.pageYOffset || document.documentElement.scrollTop;

// updateDashoffset
const updateDashoffset = () => {
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const dashoffset = pathLength - (getTop() * pathLength) / height;

  scrollUpSvgPath.style.strokeDashoffset = dashoffset;
};

// onScroll
window.addEventListener("scroll", () => {
  updateDashoffset();

  if (getTop() > offset) {
    scrollUp.classList.add("scroll-up--active");
  } else {
    scrollUp.classList.remove("scroll-up--active");
  }
});

//click
scrollUp.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Слайдер
let offsetSlider = 0; //смещение от левого края
const sliderLine = document.querySelector(".slider-line");

document.querySelector(".slider-next").addEventListener("click", function () {
  offsetSlider += 360;
  if (offsetSlider > 1080) {
    offsetSlider = 0;
  }
  sliderLine.style.left = -offsetSlider + "px";
});

document.querySelector(".slider-prev").addEventListener("click", function () {
  offsetSlider -= 360;
  if (offsetSlider < 0) {
    offsetSlider = 1080;
  }
  sliderLine.style.left = -offsetSlider + "px";
});

document.querySelector(".page-link-01").addEventListener("click", function () {
  if (offsetSlider == 360 || offsetSlider == 720 || offsetSlider == 1080) {
    offsetSlider = 0;
  }
  sliderLine.style.left = -offsetSlider + "px";
});

document.querySelector(".page-link-02").addEventListener("click", function () {
  if (offsetSlider == 0 || offsetSlider == 720 || offsetSlider == 1080) {
    offsetSlider = 360;
  }
  sliderLine.style.left = -offsetSlider + "px";
});

document.querySelector(".page-link-03").addEventListener("click", function () {
  if (offsetSlider == 0 || offsetSlider == 360 || offsetSlider == 1080) {
    offsetSlider = 720;
  }

  sliderLine.style.left = -offsetSlider + "px";
});
