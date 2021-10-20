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

const offset = 100;
const scrollUp = document.querySelector('.scroll-up')