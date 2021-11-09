window.addEventListener('DOMContentLoaded', () => {
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

  document
    .querySelector('.page-link-01')
    .addEventListener('click', function () {
      if (offsetSlider == 360 || offsetSlider == 720 || offsetSlider == 1080) {
        offsetSlider = 0;
      }
      sliderLine.style.left = -offsetSlider + 'px';
    });

  document
    .querySelector('.page-link-02')
    .addEventListener('click', function () {
      if (offsetSlider == 0 || offsetSlider == 720 || offsetSlider == 1080) {
        offsetSlider = 360;
      }
      sliderLine.style.left = -offsetSlider + 'px';
    });

  document
    .querySelector('.page-link-03')
    .addEventListener('click', function () {
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

  // ф-ция открытия модалки
  function openModal() {
    modalParent.classList.add('show');
    modalParent.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
  }

  // открытие на кнопка
  modalBtn.addEventListener('click', openModal);

  // ф-ция закрытия модалки
  function closeModal() {
    modalParent.classList.add('hide');
    modalParent.classList.remove('show');
    document.body.style.overflow = '';
  }

  // обработчик закрытия на крестик
  modalClose.addEventListener('click', closeModal);

  // закрытие при нажатии на пустую область экрана
  modalParent.addEventListener('click', (e) => {
    if (e.target === modalParent) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modalParent.classList.contains('show')) {
      closeModal();
    }
  });

  // const modalTimerId = setTimeout(openModal, 3000);

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  // window.addEventListener('scroll', showModalByScroll);

  // Timer

  // конечное время
  const deadline = '2021-12-31';

  // вычисляем оставшееся время, переводим миллисек в др велечины,
  // возвращаем единицы в виде объекта
  function getTimeRemaining(endTime) {
    const t = Date.parse(endTime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((t / 1000 / 60) % 60),
      seconds = Math.floor((t / 1000) % 60);

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  // подставляем 0 если число меньше 10
  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  // Устанавливаем время с помощью делегирования, и интервал
  // в 1000 миллисек
  function setClock(selector, endTime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timerInterval = setInterval(updateClock, 1000);

    updateClock(); // вызываем ф-цию для того, чтобы после обновления страницы выводилось сразу
    // нужное время, а не то которое прописано в вёрстке

    // Создаем переменную t в виде объекта оставшегося времени,
    // помещяем соответствующее св-во объекта в HTML,
    // Проверяем не закончилось ли время, если да, то очищаем интервал
    function updateClock() {
      const t = getTimeRemaining(endTime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timerInterval);
      }
    }
  }

  setClock('.timer', deadline);
});
