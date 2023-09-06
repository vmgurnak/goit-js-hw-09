// Задание 1 - переключатель цветов

// В HTML есть кнопки «Start» и «Stop».

// Напиши скрипт, который после нажатия кнопки «Start», раз в секунду меняет цвет фона <body> на случайное значение используя инлайн стиль. При нажатии на кнопку «Stop», изменение цвета фона должно останавливаться.

// Учти, на кнопку «Start» можно нажать бесконечное количество раз. Сделай так, чтобы пока изменение темы запушено, кнопка «Start» была не активна (disabled).

// Для генерации случайного цвета используй функцию getRandomHexColor.

// Функция для генерации случайного цвета
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

// Создание объекта с поиском элементов
const elements = {
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};
// Деструктуризация объекта
const { btnStart, btnStop, body } = elements;

let timerId = 0;

// Обработчики событи по клику для кнопок
btnStart.addEventListener('click', handlerStart);
btnStop.addEventListener('click', handlerStop);

// Коллбэк-функции
function handlerStart() {
  // setInterval() повторение изменение фона body
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  // отключение кнопки старт после нажатия
  btnStart.setAttribute('disabled', '');
}

function handlerStop() {
  // Остановка setInterval
  clearInterval(timerId);
  // включение кнокпки Старт после нажатия Стоп
  btnStart.removeAttribute('disabled', '');
}
