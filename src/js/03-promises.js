import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formSubmit = document.querySelector('.form');
const btnSubmit = document.querySelector('button');

const formData = {
  delay: '',
  step: '',
  amount: '',
};

btnSubmit.addEventListener('click', submitUserValue);
formSubmit.addEventListener('input', getInpusValue);

function getInpusValue(e) {
  formData[e.target.name] = e.target.value;
}

function submitUserValue(e) {
  e.preventDefault();

  for (let i = 0; i < formData.amount; i++) {
    const delaySum = Number(formData.delay) + Number(formData.step) * i;
    const position = 1 + i;
    setTimeout(() => {
      createPromise(position, delaySum)
        .then(() => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delaySum}ms`);
        })
        .catch(() => {
          Notify.failure(`❌ Rejected promise ${position} in ${delaySum}ms`);
        });
    }, formData.delay);
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve('');
      } else {
        reject('');
      }
    }, delay - formData.step);
  });
}
