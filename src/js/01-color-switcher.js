const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const bodyBackground = document.querySelector('body');

btnStart.addEventListener('click', startChangeColors);
btnStop.addEventListener('click', stoptChangeColors);

btnStop.disabled = true;

function startChangeColors(e) {
  bodyBackground.style.backgroundColor = getRandomHexColor();
  timerId = setInterval(() => {
    bodyBackground.style.backgroundColor = getRandomHexColor();
  }, 1000);
  e.target.disabled = true;
  btnStop.disabled = false;
}

function stoptChangeColors(e) {
  clearInterval(timerId);
  e.target.disabled = true;
  btnStart.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
