export const setToLocalStorage = (element, value) => localStorage
  .setItem(element, JSON.stringify(value));
export const getItemFromLocalStorage = (key) => {
  const localLenght = localStorage.length;
  if (localLenght < 1) return [];
  return JSON.parse(localStorage.getItem(key));
};
