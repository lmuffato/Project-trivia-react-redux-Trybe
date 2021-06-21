let cron;
let init;
let sec;
const interval = 1000;

export const pause = () => {
  clearInterval(cron);
};

export const timer = () => {
  sec -= 1;
  if (sec === 0) {
    pause();
    const buttons = document.querySelectorAll('#options > button');
    buttons[0].click();
    buttons.forEach((button) => {
      button.disabled = true;
    });
  }
  const el = document.querySelector('#timer');
  el.innerHTML = sec;
};

export const start = (initial) => {
  init = initial;
  sec = init;
  cron = setInterval(() => { timer(); }, interval);
  const el = document.querySelector('#timer');
  el.innerHTML = sec;
};

export const stop = () => {
  clearInterval(cron);
  sec = init;
};
