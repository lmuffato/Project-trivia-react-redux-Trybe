export const setToLocalStorage = (element, key) => localStorage
  .setItem(element, JSON.stringify(key));

export const getItemFromLocalStorage = (key) => {
  const localLenght = localStorage.length;
  if (localLenght < 1) return;
  return JSON.parse(localStorage.getItem(key));
};
