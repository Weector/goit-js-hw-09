import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputElement = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');
const timerElement = document.querySelector('.timer');

btnStart.disabled = true;

const options = {
  enableTime: true,
  enableSeconds: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDatesValue = selectedDates[0];

    if (selectedDatesValue <= Date.now()) {
      Notify.failure('Please choose a date in the future', {
        position: 'center-center',
        clickToClose: true,
        backOverlay: true,
        timeout: 5000,
        width: '440px',
        fontSize: '24px',
      });
    } else {
      btnStart.disabled = false;
      btnStart.addEventListener('click', startCount);

      function startCount(e) {
        timerCountStart();
        if (selectedDatesValue > 0) {
          e.target.disabled = true;
        }
      }

      function timerCountStart() {
        let timerId = null;

        timerId = setInterval(() => {
          const timeToEnd = selectedDatesValue - Date.now();
          const currentTimerValue = convertMs(timeToEnd);
          updateClockFace(currentTimerValue);

          if (timeToEnd < 1000) {
            clearInterval(timerId);
            btnStart.disabled = false;
          }
        }, 1000);
      }
    }
  },
};

flatpickr(inputElement, options);

function updateClockFace({ days, hours, minutes, seconds }) {
  daysValue.textContent = `${days}`;
  hoursValue.textContent = `${hours}`;
  minutesValue.textContent = `${minutes}`;
  secondsValue.textContent = `${seconds}`;
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

timerElement.style.cssText = `display: flex; margin-right: 10px; width: 255px; text-align: center;`;
daysValue.style.fontSize = 32 + 'px';
hoursValue.style.fontSize = 32 + 'px';
minutesValue.style.fontSize = 32 + 'px';
secondsValue.style.fontSize = 32 + 'px';
