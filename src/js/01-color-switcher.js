// Задание 1 - переключатель цветов

// В HTML есть кнопки «Start» и «Stop».

// Напиши скрипт, который после нажатия кнопки «Start», раз в секунду меняет цвет фона <body> на случайное значение используя инлайн стиль. При нажатии на кнопку «Stop», изменение цвета фона должно останавливаться.

// Учти, на кнопку «Start» можно нажать бесконечное количество раз. Сделай так, чтобы пока изменение темы запушено, кнопка «Start» была не активна (disabled).

// Для генерации случайного цвета используй функцию getRandomHexColor.

// Функция для генерации случайного цвета - Function to generate random color
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

// Объект с элементами - Object with elements
const elements = {
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};
// Деструктуризация объекта - Destructuring an object
const { btnStart, btnStop, body } = elements;

// Переменная для timerId - Variable for timerId
let timerId = 0;

// Обработчики событи по клику для кнопок - Click event handlers for buttons
btnStart.addEventListener('click', handlerStart);
btnStop.addEventListener('click', handlerStop);

// Коллбэк-функции - Callback functions
function handlerStart() {
  // setInterval() повторение изменение фона body - repeat body background change
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  // отключение кнопки старт после нажатия - disabling the start button after pressing
  btnStart.setAttribute('disabled', '');
}

function handlerStop() {
  // Остановка setInterval
  clearInterval(timerId);
  // включение кнокпки Старт после нажатия Стоп
  btnStart.removeAttribute('disabled', '');
}
