// Задание 3 - генератор промисов

// В HTML есть разметка формы, в поля которой пользователь будет вводить
// - первую задержку в миллисекундах,
// - шаг увеличения задержки для каждого промиса после первого,
// - количество промисов которое необходимо создать.

// Напиши скрипт, который при сабмите формы
// - вызывает функцию createPromise(position, delay)
// - столько раз, сколько ввели в поле amount.
// - При каждом вызове передай ей
//    - номер создаваемого промиса(position)
//    - и задержку учитывая введенную     пользователем первую задержку(delay) и шаг(step).

// Дополни код функции createPromise так, чтобы
// - она возвращала один промис, который выполянется или отклоняется через delay времени.
// - Значением промиса должен быть объект, в котором будут свойства position и delay со значениями одноименных параметров.
// - Используй начальный код функции для выбора того, что нужно сделать с промисом - выполнить или отклонить.

// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });

// Поиск формы
const form = document.querySelector('.form');
// Слушатель на форме, событие submit
form.addEventListener('submit', handlerSubmit);

// Коллбэк-функция
function handlerSubmit(event) {
  // Отмена действий по умолчанию при отправке формы
  event.preventDefault();

  // Значения input формы в числовом формате
  let delay = Number(event.currentTarget.elements.delay.value);
  const step = Number(event.currentTarget.elements.step.value);
  const amount = Number(event.currentTarget.elements.amount.value);

  // Цикл для вызова функции createPromise amount раз
  for (let i = 1; i <= amount; i += 1) {
    // Вызов функции createPromise
    createPromise(i, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    // увеличение задержки на шаг
    delay += step;
  }
}

// Функция createPromise возвращает промисс -объект со свойствами position и delay
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    // setTimeout - задержка при возврате промисса
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
