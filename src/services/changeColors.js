const changeColors = () => {
  const buttons = document.querySelectorAll('.answer');
  buttons.forEach((button) => {
    if (button.getAttribute('data-testid').includes('wrong')) {
      button.classList.add('incorrect');
    } else {
      button.classList.add('correct');
    }
  });
};

export default changeColors;
