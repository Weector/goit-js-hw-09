const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const bodyBackground = document.querySelector('body');

btnStart.addEventListener('click', startChangeColors);
btnStop.addEventListener('click', stoptChangeColors);

btnStop.disabled = true;
let timerId;
function startChangeColors(e) {
  btnStop.disabled = false;
  e.target.disabled = true;
  bodyBackground.style.backgroundColor = getRandomHexColor();
  timerId = setInterval(() => {
    bodyBackground.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stoptChangeColors(e) {
  clearInterval(timerId);
  e.target.disabled = true;
  btnStart.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
