const disableBtns = () => {
  const buttons = document.querySelectorAll('.answer');
  buttons.forEach((button) => button.setAttribute('disabled', 'disabled'));
};

export default disableBtns;
