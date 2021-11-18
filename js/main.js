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

  //  Slider

  const slides = document.querySelectorAll('.slider-line img'),
    prev = document.querySelector('.slider-prev'),
    next = document.querySelector('.slider-next'),
    firstButton = document.querySelector('.page-link-01'),
    secondButton = document.querySelector('.page-link-02'),
    thirdButton = document.querySelector('.page-link-03');
  let slideIndex = 1;

  showSlides(slideIndex);

  function showSlides(n) {
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }

    slides.forEach((item) => (item.style.display = 'none'));
    slides[slideIndex - 1].style.display = 'block';
  }

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  function showSlidesByNumber (n) {
    slides.forEach((item) => (item.style.display = 'none'));
    slides[n].style.display = 'block';
  }

  prev.addEventListener('click', () => {
    plusSlides(-1);
  });
  next.addEventListener('click', () => {
    plusSlides(1);
  });
  firstButton.addEventListener('click', () => {
    showSlidesByNumber(0);
  });
  secondButton.addEventListener('click', () => {
    showSlidesByNumber(1);
  });
  thirdButton.addEventListener('click', () => {
    showSlidesByNumber(2);
  });

  // Альтернативный слайдер

  // let offsetSlider = 0; //смещение от левого края
  // let offsetText = 0; // смещение текста
  // const sliderLine = document.querySelector('.slider-line');

  // document.querySelector('.slider-next').addEventListener('click', function () {
  //   offsetSlider += 360;
  //   if (offsetSlider > 1080) {
  //     offsetSlider = 0;
  //   }
  //   sliderLine.style.left = -offsetSlider + 'px';
  // });

  // document.querySelector('.slider-prev').addEventListener('click', function () {
  //   offsetSlider -= 360;
  //   if (offsetSlider < 0) {
  //     offsetSlider = 1080;
  //   }
  //   sliderLine.style.left = -offsetSlider + 'px';
  // });

  // document
  //   .querySelector('.page-link-01')
  //   .addEventListener('click', function () {
  //     if (offsetSlider == 360 || offsetSlider == 720 || offsetSlider == 1080) {
  //       offsetSlider = 0;
  //     }
  //     sliderLine.style.left = -offsetSlider + 'px';
  //   });

  // document
  //   .querySelector('.page-link-02')
  //   .addEventListener('click', function () {
  //     if (offsetSlider == 0 || offsetSlider == 720 || offsetSlider == 1080) {
  //       offsetSlider = 360;
  //     }
  //     sliderLine.style.left = -offsetSlider + 'px';
  //   });

  // document
  //   .querySelector('.page-link-03')
  //   .addEventListener('click', function () {
  //     if (offsetSlider == 0 || offsetSlider == 360 || offsetSlider == 1080) {
  //       offsetSlider = 720;
  //     }

  //     sliderLine.style.left = -offsetSlider + 'px';
  //   });

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
    modalParent = document.querySelector('.modal'); // родитель модал окна

  // ф-ция открытия модалки
  function openModal() {
    modalParent.classList.add('show');
    modalParent.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
  }

  // открытие на кнопку
  modalBtn.addEventListener('click', openModal);

  // ф-ция закрытия модалки
  function closeModal() {
    modalParent.classList.add('hide');
    modalParent.classList.remove('show');
    document.body.style.overflow = '';
  }

  // закрытие при нажатии на пустую область экрана или на крестик
  modalParent.addEventListener('click', (e) => {
    if (e.target === modalParent || e.target.getAttribute('data-close') == '') {
      closeModal();
    }
  });

  // закрытие на кнопку esc
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modalParent.classList.contains('show')) {
      closeModal();
    }
  });

  const modalTimerId = setTimeout(openModal, 50000);

  // открытие модалки при скроле в конец экрана
  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);

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

  //Карточки (работа с сервером)

  class MenuCard {
    constructor(
      src,
      alt,
      title,
      descr,
      price,
      parentSelector,
      ...classes /*rest*/
    ) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.parentSelector = parentSelector;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector); // родит класс, куда будет помещаться HTML
      this.transfer = 2.46;
      this.changeToBYN();
    }

    changeToBYN() {
      this.price = this.price * this.transfer;
    }
    // ф-ция, где создаем эл-т div, далее внутрь его помещаем html с подставлением вышеобъявленных переменных
    render() {
      const element = document.createElement('div');

      if (this.classes.length === 0) {
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      }
      element.innerHTML = `
        <img src=${this.src} alt=${this.alt} />
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">
          ${this.descr}
        </div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> руб</div>
        </div>
      `;
      this.parent.append(element);
    }
  }

  // ф-ция отправки запроса на сервер, если результат не ОК, то
  // выбрасывает ошибку, если ок, то возвращает в формате json
  const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  // делаем запрос на сервер, создаем объект с соответствующими
  // каждому блоку параметрами и вызываем
  // на нем метод render()
  getResource('http://localhost:3000/menu').then((data) => {
    data.forEach(({ img, altimg, title, descr, price }) => {
      new MenuCard(
        img,
        altimg,
        title,
        descr,
        price,
        '.menu .container'
      ).render();
    });
  });

  // Forms (работа с сервером)

  // обращаемся к тегу form
  const forms = document.querySelectorAll('form');

  //создаем объект сообщений о завершении операции
  const message = {
    loading: 'img/spinner.svg',
    success: 'Спасибо, мы скоро с вами свяжемся',
    fail: 'Что-то пошло не так',
  };

  // на каждую форму подвязываем ф-цию bindPostData
  forms.forEach((item) => {
    bindPostData(item);
  });

  // ф-ция отправки данных на сервер, получение ответа с сервера
  // в виде promise, конвертация в json
  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: 'POST', // каким образом
      headers: {
        'Content-type': 'application/json',
      },
      body: data, // что именно
    });

    return await res.json();
  };

  // Отправка, обработка данных сервером и ответ в виде модалки
  function bindPostData(form) {
    // добавление спинера
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
              display: block;
              margin: 0 auto;
            `;
      form.insertAdjacentElement('afterend', statusMessage);

      // обработка данных пол-ля
      const formData = new FormData(form);

      // 1. Массив массивов 2. Объект 3. JSON
      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      // отправляем запрос с данными json на сервер
      postData('http://localhost:3000/requests', json)
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        }) // обработка ошибок
        .catch(() => {
          showThanksModal(message.fail);
        }) // очищаем форму
        .finally(() => {
          form.reset();
        });
    });
  }

  // окно благодарности
  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
      <div class = "modal__content">
        <div class = "modal__close" data-close>×</div>
        <div class = "modal__title">${message}</div>        
      </div>
    `;

    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModal();
    }, 4000);
  }
});

// 2й спинер огромный!! испрвить!
