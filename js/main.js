// Раскрывающийся текст
function readMore() {
  let dots = document.getElementById('dots');
  let readMore = document.getElementById('read_more');
  let readMoreBtn = document.getElementById('read_more_btn');

  if (dots.style.display === 'none') {
    dots.style.display = 'inline';
    readMore.style.display = 'none';
    readMoreBtn.innerHTML = 'read more';
  } else {
    dots.style.display = 'none';
    readMore.style.display = 'inline';
    readMoreBtn.innerHTML = 'less';
  }
}

// Прокрутка вниз
const offset = 100;
const scrollUp = document.querySelector('.scroll-up');
const scrollUpSvgPath = document.querySelector('.scroll-up__svg-path');
const pathLength = scrollUpSvgPath.getTotalLength();

scrollUpSvgPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
scrollUpSvgPath.style.transition = 'stroke-dashoffset 20ms';

const getTop = () => window.pageYOffset || document.documentElement.scrollTop;

// updateDashoffset
const updateDashoffset = () => {
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const dashoffset = pathLength - (getTop() * pathLength) / height;

  scrollUpSvgPath.style.strokeDashoffset = dashoffset;
};

// onScroll
window.addEventListener('scroll', () => {
  updateDashoffset();

  if (getTop() > offset) {
    scrollUp.classList.add('scroll-up--active');
  } else {
    scrollUp.classList.remove('scroll-up--active');
  }
});

//click
scrollUp.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

// Слайдер
let offsetSlider = 0; //смещение от левого края
let offsetText = 0; // смещение текста
const sliderLine = document.querySelector('.slider-line');

document.querySelector('.slider-next').addEventListener('click', function () {
  offsetSlider += 360;
  if (offsetSlider > 1080) {
    offsetSlider = 0;
  }
  sliderLine.style.left = -offsetSlider + 'px';
});

document.querySelector('.slider-prev').addEventListener('click', function () {
  offsetSlider -= 360;
  if (offsetSlider < 0) {
    offsetSlider = 1080;
  }
  sliderLine.style.left = -offsetSlider + 'px';
});

document.querySelector('.page-link-01').addEventListener('click', function () {
  if (offsetSlider == 360 || offsetSlider == 720 || offsetSlider == 1080) {
    offsetSlider = 0;
  }
  sliderLine.style.left = -offsetSlider + 'px';
});

document.querySelector('.page-link-02').addEventListener('click', function () {
  if (offsetSlider == 0 || offsetSlider == 720 || offsetSlider == 1080) {
    offsetSlider = 360;
  }
  sliderLine.style.left = -offsetSlider + 'px';
});

document.querySelector('.page-link-03').addEventListener('click', function () {
  if (offsetSlider == 0 || offsetSlider == 360 || offsetSlider == 1080) {
    offsetSlider = 720;
  }

  sliderLine.style.left = -offsetSlider + 'px';
});

// Табы

const tabs = document.querySelectorAll('.tabheader__item'), //  табы
  tabsContent = document.querySelectorAll('.tabcontent'), // картинки
  tabParent = document.querySelector('.tabheader__items'); // родитель табов

// ф-ция для скрытия табов
function hideTabContent() {
  tabsContent.forEach((item) => {
    item.classList.add('hide');
    item.classList.remove('show', 'fade');

    tabs.forEach((item) => {
      item.classList.remove('tabheader__item_active');
    });
  });
}

// ф-ция для показа 1го эл-та табов
function showTabContent(i = 0) {
  tabsContent[i].classList.add('show', 'fade');
  tabsContent[i].classList.remove('hide');
  tabs[i].classList.add('tabheader__item_active');
}

hideTabContent();
showTabContent();

// обработич события с помощью делегирования
tabParent.addEventListener('click', (event) => {
  const target = event.target;

  if (target && target.classList.contains('tabheader__item')) {
    tabs.forEach((elem, i) => {
      if (target == elem) {
        hideTabContent();
        showTabContent(i);
      }
    });
  }
});

// Modal

const modalBtn = document.querySelector('.account__btn'), // кнопка откр. модалки
  modalParent = document.querySelector('.modal'), // родитель модал окна
  modalClose = document.querySelector('[data-close]'); // закрытие на крестик

function openModal() {
  modalParent.classList.add('show');
  modalParent.classList.remove('hide');
  document.body.style.overflow = 'hidden';
}

// открытие на кнопка
modalBtn.addEventListener('click', openModal);

function closeModal() {
  modalParent.classList.add('hide');
  modalParent.classList.remove('show');
  document.body.style.overflow = '';
}

// закрытие на крестик
modalClose.addEventListener('click', closeModal);
