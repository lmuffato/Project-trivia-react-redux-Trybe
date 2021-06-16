/**
 * Set key in localStorage with value
 * @param {String} key Key for localStorage
 * @param {String} value Value in localStorage
 * @returns void
 */
export const setLocalStorage = (key, value) => localStorage.setItem(key, value);

/**
 * Get value for key in localStorage
 * @param {String} key Key in localStorage
 * @returns Returns the current value associated with the given key, or null if the given
 * key does not exist in the list associated with the object.
 */
export const getLocalStorage = (key) => localStorage.getItem(key);

export const getRandomNumber = (max, min = 0) => (
  Math.floor(Math.random() * (max + 1 - min) + min)
);

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export function shuffle(array) {
  let currentIndex = array.length;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= currentIndex;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
