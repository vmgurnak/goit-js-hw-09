// Задание 2 - таймер обратного отсчета

// Напиши скрипт таймера, который ведёт обратный отсчет до определенной даты. Такой таймер может использоваться в блогах и интернет-магазинах, страницах регистрации событий, во время технического обслуживания и т. д.

// В HTML есть готовая разметка таймера, поля выбора конечной даты и кнопки, при клике по которой таймер должен запускаться. Добавь минимальное оформление элементов интерфейса.

// Используй библиотеку flatpickr для того чтобы позволить пользователю кроссбраузерно выбрать конечную дату и время в одном элементе интерфейса.

// Код без комментариев

import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/material_blue.css';
import Notiflix from 'notiflix';

Notiflix.Notify.init({
  width: '300px',
  fontSize: '18px',
  position: 'right-top',
  closeButton: false,
});

const elements = {
  inputDate: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
  day: document.querySelector('[data-days]'),
  hour: document.querySelector('[data-hours]'),
  minute: document.querySelector('[data-minutes'),
  second: document.querySelector('[data-seconds]'),
};
const { inputDate, btnStart, btnStop, day, hour, minute, second } = elements;

btnStart.setAttribute('disabled', '');
btnStop.setAttribute('disabled', '');

let selectedDateTime;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = Date.now();
    selectedDateTime = selectedDates[0].getTime();
    if (selectedDateTime < currentDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      btnStart.removeAttribute('disabled', '');
    }
  },
};

flatpickr(inputDate, options);

btnStart.addEventListener('click', handlerStart);
btnStop.addEventListener('click', handlerStop);

function handlerStart() {
  btnStart.setAttribute('disabled', '');
  btnStop.removeAttribute('disabled', '');
  inputDate.setAttribute('disabled', '');

  timerId = setInterval(() => {
    const currentDate = Date.now();
    const restTime = selectedDateTime - currentDate;
    if (restTime >= 0) {
      day.textContent = addLeadingZero(convertMs(restTime).days);
      hour.textContent = addLeadingZero(convertMs(restTime).hours);
      minute.textContent = addLeadingZero(convertMs(restTime).minutes);
      second.textContent = addLeadingZero(convertMs(restTime).seconds);
    } else {
      clearInterval(timerId);
      inputDate.removeAttribute('disabled', '');
      btnStart.removeAttribute('disabled', '');
      btnStop.setAttribute('disabled', '');
      day.textContent = '00';
      hour.textContent = '00';
      minute.textContent = '00';
      second.textContent = '00';
      Notiflix.Notify.failure('Please choose a date in the future');
    }
  }, 1000);
}

function handlerStop() {
  clearInterval(timerId);
  inputDate.removeAttribute('disabled', '');
  btnStart.removeAttribute('disabled', '');
  btnStop.setAttribute('disabled', '');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

// Код с комментариями

// // Установка - Installation npm flatpickr - Installing npm FlatPickr
// // npm i flatpickr --save
// import flatpickr from 'flatpickr';
// // Дополнительный импорт стандартных стилей - Additional import of standard styles
// // import 'flatpickr/dist/flatpickr.min.css';
// // Импорт стилей material_blue - Import styles material_blue;
// import 'flatpickr/dist/themes/material_blue.css';
// // Подключение библиотеки notiflix;
// // import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import Notiflix from 'notiflix';

// // Параметры для нотификации notiflix
// Notiflix.Notify.init({
//   width: '300px',
//   fontSize: '18px',
//   position: 'right-top',
//   closeButton: false,
// });

// // Объект элементов и деструктуризация - Element Object and Destructuring
// const elements = {
//   inputDate: document.querySelector('#datetime-picker'),
//   btnStart: document.querySelector('[data-start]'),
//   btnStop: document.querySelector('[data-stop]'),
//   day: document.querySelector('[data-days]'),
//   hour: document.querySelector('[data-hours]'),
//   minute: document.querySelector('[data-minutes'),
//   second: document.querySelector('[data-seconds]'),
// };
// const { inputDate, btnStart, btnStop, day, hour, minute, second } = elements;

// // Отключение кнопок Старт и Стоп по умолчанию - Disabling the Start and Stop buttons by default
// btnStart.setAttribute('disabled', '');
// btnStop.setAttribute('disabled', '');

// // Переменная для выбранной даты и времени - Variable for selected date and time
// let selectedDateTime;
// // Перемення для ID интервала - Variable for interval ID
// let timerId = null;

// // Объект параметров для flatpickr
// const options = {
//   // Включает выбор времени
//   enableTime: true,
//   // Отображает выбор времени в 24-часовом режиме без выбора AM/PM
//   time_24hr: true,
//   //   Устанавливает начальную выбранную дату - текущую дату.
//   defaultDate: new Date(),
//   //   Регулирует шаг ввода минут (включая прокрутку)
//   minuteIncrement: 1,
//   //   Функция, которые будут активироваться каждый раз при закрытии календаря.
//   onClose(selectedDates) {
//     //   Текущая дата new Date(), метод getTime() - числовое представление
//     const currentDate = new Date().getTime();
//     // const currentDate = Date.now();
//     // Выбранная дата selectedDates[0]
//     selectedDateTime = selectedDates[0].getTime();
//     //   Сравнение выбранной даты с текущей
//     if (selectedDateTime < currentDate) {
//       // Нотификация об ошибке - Error Notification
//       Notiflix.Notify.failure('Please choose a date in the future');
//     } else {
//       // включение кнокпки Старт после выбора даты - enabling the Start button after selecting a date
//       btnStart.removeAttribute('disabled', '');
//     }
//   },
// };

// // Создание экземпляра FlatPickr - Creating a FlatPickr Instance
// flatpickr(inputDate, options);

// // Вызов слушателя события Клик для кнопки Старт
// btnStart.addEventListener('click', handlerStart);
// // Вызов слушателя события Клик для кнопки Стоп
// btnStop.addEventListener('click', handlerStop);

// // Коллбэк-функция для слушателя на кнопке Старт
// function handlerStart() {
//   // Отключение кнопки Start после клика
//   btnStart.setAttribute('disabled', '');
//   // Включение кнопки Stop после клика Start
//   btnStop.removeAttribute('disabled', '');
//   // отключение input после клика по кнопке Старт
//   inputDate.setAttribute('disabled', '');

//   // setInterval() интервал раз в секунду
//   timerId = setInterval(() => {
//     //   Текущая дата, метод getTime() - числовое представление
//     // const currentDate = new Date().getTime();
//     const currentDate = Date.now();
//     //   Разница между выбранной и текущей датами
//     const restTime = selectedDateTime - currentDate;
//     // console.log(restTime);
//     // Вывод значения таймера, если дата больше текущей даты
//     if (restTime >= 0) {
//       //   Присвоение значений свойств функции restTime спанам для вывода значений счетчика
//       day.textContent = addLeadingZero(convertMs(restTime).days);
//       hour.textContent = addLeadingZero(convertMs(restTime).hours);
//       minute.textContent = addLeadingZero(convertMs(restTime).minutes);
//       second.textContent = addLeadingZero(convertMs(restTime).seconds);
//     } else {
//       //  удаление интервала
//       clearInterval(timerId);
//       // Активация Input и Start
//       inputDate.removeAttribute('disabled', '');
//       btnStart.removeAttribute('disabled', '');
//       // Отключение кнопки Stop
//       btnStop.setAttribute('disabled', '');
//       // Обнуление интерфейса таймера
//       day.textContent = '00';
//       hour.textContent = '00';
//       minute.textContent = '00';
//       second.textContent = '00';
//       // Предупреждение о неправильной дате
//       Notiflix.Notify.failure('Please choose a date in the future');
//     }
//   }, 1000);
// }

// // Коллбэк-функция для слушателя на кнопке Стоп
// function handlerStop() {
//   clearInterval(timerId);
//   inputDate.removeAttribute('disabled', '');
//   btnStart.removeAttribute('disabled', '');
//   btnStop.setAttribute('disabled', '');
// }

// // Функция для подсчета значений
// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = Math.floor(ms / day);
//   // Remaining hours
//   const hours = Math.floor((ms % day) / hour);
//   // Remaining minutes
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   // Remaining seconds
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }

// //Функция для форматирования времени в двузначном формате
// function addLeadingZero(value) {
//   return value.toString().padStart(2, '0');
// }
