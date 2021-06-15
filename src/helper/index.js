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
