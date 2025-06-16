import '../scss/app.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination, Navigation } from 'swiper/modules';
import Swiper from 'swiper';
import customSelect from 'custom-select';
import 'custom-select/build/custom-select.css';
import { gamesData } from './data';
import { gamesDataEn } from './dataEn';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: false,
  progressBar: false,
  positionClass: 'toast-top-center',
  preventDuplicates: false,
  onclick: null,
  showDuration: '300',
  hideDuration: '1000',
  timeOut: '5000',
  extendedTimeOut: '1000',
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut',
};

const header = document.querySelector('.header');
const burger = document.querySelector('.header-burger');
const nav = document.querySelector('.nav');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  nav.classList.toggle('open');
  header.classList.toggle('active');
  document.querySelector('body').classList.toggle('overflow');
});

const form = document.getElementById('contact-form');
const username = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');
const checkbox = document.getElementById('checkbox');

const isEnglish = window.location.pathname.includes('en');

const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');

  errorDisplay.innerText = '';
  inputControl.classList.add('success');
  inputControl.classList.remove('error');
};

const validateInputs = () => {
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const messageValue = message.value.trim();
  const checkboxValue = checkbox.checked;

  if (usernameValue === '') {
    setError(username, isEnglish ? 'Please enter the name' : 'Lūdzu ievadiet vārdu!');
    return;
  } else {
    setSuccess(username);
  }

  if (emailValue === '') {
    setError(email, isEnglish ? 'Please enter email' : 'Lūdzu ievadiet e-pastu');
    return;
  } else if (!isValidEmail(emailValue)) {
    setError(email, isEnglish ? 'Please enter email' : 'Lūdzu ievadiet e-pastu');
    return;
  } else {
    setSuccess(email);
  }

  if (messageValue === '') {
    setError(message, isEnglish ? 'Please type in the message' : 'Lūdzu ierakstiet ziņojumu');
    return;
  } else {
    setSuccess(username);
  }
  if (!checkboxValue) {
    setError(checkbox, isEnglish ? 'Mark your acceptance of the terms' : 'Atzīmējiet, ka piekrītat noteikumiem');
    return;
  }
  postData(usernameValue, emailValue, messageValue);
};

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');
  errorDisplay.innerText = message;
  inputControl.classList.add('error');
  inputControl.classList.remove('success');
};

if (username) {
  username.addEventListener('input', function (e) {
    if (e.target.value === '') {
      setError(e.target, isEnglish ? 'Please enter the name!' : 'Lūdzu ievadiet vārdu!');
      return;
    } else {
      setSuccess(e.target);
    }
  });
}

if (email) {
  email.addEventListener('input', function (e) {
    if (e.target.value === '') {
      setError(e.target, isEnglish ? 'Please enter email' : 'Lūdzu ievadiet e-pastu');
      return;
    } else if (!isValidEmail(e.target.value)) {
      setError(e.target, isEnglish ? 'Please enter email' : 'Lūdzu ievadiet e-pastu');
      return;
    } else {
      setSuccess(e.target);
    }
  });
}

if (message) {
  message.addEventListener('input', function (e) {
    if (e.target.value === '') {
      setError(e.target, isEnglish ? 'Please type in the message' : 'Lūdzu ierakstiet ziņojumu');
      return;
    } else {
      setSuccess(e.target);
    }
  });
}

if (checkbox) {
  checkbox.addEventListener('change', function (e) {
    if (!checkbox.checked) {
      setError(checkbox, isEnglish ? 'Mark your acceptance of the terms' : 'Atzīmējiet, ka piekrītat noteikumiem');
      return;
    } else {
      setSuccess(e.target);
    }
  });
}

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    validateInputs();
  });
}

const postData = (namev, emailv, messagev) => {
  fetch('', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: namev,
      email: emailv,
      message: messagev,
    }),
  })
    .then((response) => {
      toastr.success(
        isEnglish
          ? 'The message has been sent! We will contact you.'
          : 'Ziņojums ir nosūtīts! Mēs ar Jums sazināsimies.',
        isEnglish ? 'Thank you.' : 'Paldies!'
      );
      username.value = '';
      email.value = '';
      message.value = '';
      checkbox.checked = false;
    })
    .catch((e) => {
      toastr.error('Nosūtīšanas kļūda', 'Error');
    });
};

const mySelect1 = document.querySelector('.mySelect1');
const gameImage = document.getElementById('game-image');
const gameDesc = document.getElementById('game-describe');

customSelect(mySelect1);

const links = document.querySelectorAll('.nav-list__link');
for (let i = 0; i < links.length; i++) {
  if (links[i].href == document.URL) {
    links[i].className += ' active';
  }
}

const gamesD = isEnglish ? gamesDataEn : gamesData;

if (mySelect1) {
  mySelect1.addEventListener('change', function (e) {
    const { value } = e.target;
    const obj = gamesD.find((i) => i.id == value);
    if (obj) {
      gameDesc.innerHTML = obj.content;
      gameImage.src = `../images/content/steam-${value}.jpg`;
    }
  });
}

const words = ['Darbība', 'Paradumi', 'Lojalitāte', 'Termināls', 'Kartes', 'Mobilā lietotne'];

const swiper = new Swiper('.mySwiper', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  modules: [Pagination, Navigation],
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + words[index] + '</span>';
    },
  },
});

const wordsHeadline = [
  'Rēķinu apmaksa',
  'Priekšapmaksas karšu bilances papildināšana',
  'Piekļuve iemīļotajām spēlēm un tiešsaistes pakalpojumiem',
];

const wordsHeadlineEn = [
  'Payment of bills',
  'Topping up prepaid card balances',
  'Access to your favourite games and online services',
];

const bullets = isEnglish ? wordsHeadlineEn : wordsHeadline;

const swiperHeadlide = new Swiper('.headlideSwiper', {
  modules: [Pagination],
  pagination: {
    el: '.swiper-pagination-headline',
    clickable: true,
    renderBullet: function (index, className) {
      return `<span class="${className}"><svg width="19" height="32" viewBox="0 0 19 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.14214 1.85786L16.2843 16L2.14214 30.1421" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
      </svg> ${bullets[index]}</span>`;
    },
  },
});

const urlParams = new URLSearchParams(window.location.search);
const slideParam = urlParams.get('slide');

if (slideParam) {
  swiper.slideTo(slideParam);
}

let acc = document.querySelectorAll('.accordion'),
  i;
for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener('click', function () {
    let desc = this.nextElementSibling;
    this.classList.toggle('active');
    desc.style.maxHeight ? (desc.style.maxHeight = null) : (desc.style.maxHeight = desc.scrollHeight + 'px');
  });
}

const HighlightNav = ({ navHrefTags, sectionClass }) => {
  const getAll = (x) => document.querySelectorAll(x);
  const getFirst = (x) => document.querySelector(x);
  const attr = (el, x) => el.getAttribute(x);
  const css = (el, cmd, x) =>
    cmd == 'has'
      ? el.classList.contains(x)
      : cmd == 'cut'
      ? el.classList.remove(x)
      : cmd == 'add'
      ? el.classList.add(x)
      : undefined;
  const navLinks = [...getAll(navHrefTags)];
  const sections = [...getAll(sectionClass)].reverse();
  const anchor = (x) => `${navHrefTags}[href=\\#${x}]`;
  const anchors = sections.reduce((obj, el) => {
    const id = attr(el, 'id');
    return {
      ...obj,
      [id]: getFirst(anchor(id)),
    };
  }, {});
  const highlightNav = () => {
    sections.forEach((el) => {
      const scrollPosition = window.pageYOffset;
      const bottomOfElement = el.getBoundingClientRect().bottom;
      const bottomOfElementPosition = bottomOfElement + scrollPosition;
      if (scrollPosition <= bottomOfElementPosition) {
        const link = anchors[attr(el, 'id')];
        if (!css(link, 'has', 'active')) {
          navLinks.forEach((el) => {
            css(el, 'cut', 'active');
          });
          css(link, 'add', 'active');
        }
        return 0;
      }
    });
  };
  return Object.freeze({
    listen() {
      let ticking = false;
      window.addEventListener('scroll', (e) => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            highlightNav();
            ticking = false;
          });
          ticking = true;
        }
      });
    },
  });
};

const example = HighlightNav({
  navHrefTags: '#section-nav a',
  sectionClass: '.header-title',
});

example.listen();

let map;
let userLocation;
const markers = [];

async function initMap() {}

function findUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        new google.maps.Marker({
          position: userLocation,
          map: map,
          title: 'Ваше местоположение',
          icon: {
            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          },
        });

        map.setCenter(userLocation);
        map.setZoom(10);
        const closestMarkers = findClosestMarkers(userLocation, 1);
        closestMarkers.forEach((marker) => {
          createColoredMarker(marker.coords, marker.location, '#ff0000'); // Изменяем цвет на красный
        });
      },
      () => {
        alert('Ошибка получения местоположения.');
      }
    );
  } else {
    alert('Geolocation не поддерживается вашим браузером.');
  }
}

async function createColoredMarker(coords, data, color) {
  const { Map, InfoWindow } = await google.maps.importLibrary('maps');
  const infoWindow = new InfoWindow();

  const pin = new google.maps.marker.PinElement({
    glyph: 'T',
    glyphColor: 'white',
    scale: 1,
    background: color,
    borderColor: color,
  });

  const marker = new google.maps.marker.AdvancedMarkerElement({
    position: { lat: coords.lat, lng: coords.lng },
    map: map,
    title: data.Title,
    content: pin.element,
    gmpClickable: true,
  });

  marker.addListener('click', ({ domEvent, latLng }) => {
    console.log('data', data);
    // map.setZoom(10);
    // map.setCenter({ lat: coords.lat, lng: coords.lng });
    const content = `
      <div class="dialog">
       <div class="dialog__title">${isEnglish ? 'Name' : 'Nosaukums'}</div>
       <div class="dialog__text"><strong>${data.Title}</strong></div>

       <div class="dialog__title">${isEnglish ? 'Company' : 'Jur. pers.'}</div>
       <div class="dialog__text">${data.jurpers}</div>

       <div class="dialog__title">${isEnglish ? 'Address' : 'Adrese'}</div>
       <div class="dialog__text">${data.Adrese1 ? data.Adrese1 + ',' : ''} ${data.Adrese2 ? data.Adrese2 + ',' : ''} ${
      data.Adrese3 ? data.Adrese3 + ',' : ''
    } ${data.Adrese4 ? data.Adrese4 + ',' : ''} ${data.Adrese5}</div>

       <div class="dialog__title">${isEnglish ? 'Working hours' : 'Darba laiks'}</div>
       <div class="dialog__text">${data.Darbalaiks1 ? data.Darbalaiks1 + ',' : ''} ${
      data.Darbalaiks2 ? data.Darbalaiks2 + ',' : ''
    } ${data.Darbalaiks3}</div>
      </div>

    `;

    infoWindow.close();
    infoWindow.setContent(content);
    infoWindow.open(marker.map, marker);
  });
}

function findClosestMarkers(userLocation, count) {
  markers.sort((a, b) => {
    const distanceA = google.maps.geometry.spherical.computeDistanceBetween(
      new google.maps.LatLng(userLocation.lat, userLocation.lng),
      new google.maps.LatLng(a.coords.lat, a.coords.lng)
    );
    const distanceB = google.maps.geometry.spherical.computeDistanceBetween(
      new google.maps.LatLng(userLocation.lat, userLocation.lng),
      new google.maps.LatLng(b.coords.lat, b.coords.lng)
    );
    return distanceA - distanceB;
  });
  return markers.slice(0, count);
}

if (window.location.pathname.includes('private-person')) {
  window.onload = initMap;
}
