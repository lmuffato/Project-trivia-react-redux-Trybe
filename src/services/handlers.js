const correct = 'correct-answer';

const handleColors = () => {
  const buttons = document.querySelectorAll('button');
  // console.log('hanldeColors on!');
  for (let index = 0; index < buttons.length; index += 1) {
    if (buttons[index].className === correct) {
      buttons[index].style.border = '3px solid rgb(6, 240, 15)';
    } else if ((buttons[index].className).includes('wrong')) {
      buttons[index].style.border = '3px solid rgb(255, 0, 0)';
    }
  }
};

export default handleColors;
