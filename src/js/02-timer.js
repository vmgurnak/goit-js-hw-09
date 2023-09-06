// Задание 2 - таймер обратного отсчета

// Напиши скрипт таймера, который ведёт обратный отсчет до определенной даты. Такой таймер может использоваться в блогах и интернет-магазинах, страницах регистрации событий, во время технического обслуживания и т. д.

// В HTML есть готовая разметка таймера, поля выбора конечной даты и кнопки, при клике по которой таймер должен запускаться. Добавь минимальное оформление элементов интерфейса.

// Используй библиотеку flatpickr для того чтобы позволить пользователю кроссбраузерно выбрать конечную дату и время в одном элементе интерфейса.

// Установка npm flatpickr
// npm i flatpickr --save
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

// Создание объекта с поиском элементов и деструктуризация
const elements = {
  inputDate: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  day: document.querySelector('[data-days]'),
  hour: document.querySelector('[data-hours]'),
  minute: document.querySelector('[data-minutes'),
  second: document.querySelector('[data-seconds]'),
};
const { inputDate, btnStart, day, hour, minute, second } = elements;

// Отключение кнопки Старт по умолчанию
btnStart.setAttribute('disabled', '');

// Переменная для выбранной даты и времени
let selectedDateTime;

// Объект параметров для flatpickr
const options = {
  // Включает выбор времени
  enableTime: true,
  // Отображает выбор времени в 24-часовом режиме без выбора AM/PM
  time_24hr: true,
  //   Устанавливает начальную выбранную дату - текущую дату.
  defaultDate: new Date(),
  //   Регулирует шаг ввода минут (включая прокрутку)
  minuteIncrement: 1,
  //   Функция, которые будут активироваться каждый раз при закрытии календаря.
  onClose(selectedDates) {
    //   Текущая дата new Date(), метод getTime() - числовое представление
    const currentDate = new Date().getTime();
    // Выбранная дата selectedDates[0]
    selectedDateTime = selectedDates[0].getTime();
    //   Сравнение выбранной даты с текущей
    if (selectedDateTime < currentDate) {
      alert('Please choose a date in the future');
    } else {
      // включение кнокпки после выбора даты
      btnStart.removeAttribute('disabled', '');
    }
  },
};
// Вызов flatpickr;
flatpickr(inputDate, options);

// Вызов слушателя события Клик для кнопки Старт
btnStart.addEventListener('click', handlerStart);
// Коллбэк-функция для слушателя
function handlerStart() {
  // Отключение кнопки Stert после клика
  btnStart.setAttribute('disabled', '');
  // setInterval() интервал раз в секунду
  const timerId = setInterval(() => {
    //   Текущая дата, метод getTime() - числовое представление
    const currentDate = new Date().getTime();
    //   Разница между выбранной и текущей датами
    const restTime = selectedDateTime - currentDate;
    // Вывод значения таймера, если дата больше текущей даты
    if (restTime >= 0) {
      //   Присвоение значений свойств функции restTime спанам для вывода значений счетчика
      day.textContent = addLeadingZero(convertMs(restTime).days);
      hour.textContent = addLeadingZero(convertMs(restTime).hours);
      minute.textContent = addLeadingZero(convertMs(restTime).minutes);
      second.textContent = addLeadingZero(convertMs(restTime).seconds);
    } else {
      //  остановка счетчика
      clearInterval(timerId);
      // btnStart.removeEventListener('click', handlerStart);
    }
  }, 1000);
}

// Функция для подсчета значений
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

//Функция для форматирования времени в двузначном формате
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
