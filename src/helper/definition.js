/**
 * Return name var, let, const.
 * | Ex: varToString({ var }).
 * If the type is not object return undefined.
 * @param {Object} objAttribute {}
 * @returns {string} var name
 */
export function varToString(objAttribute) {
  if (typeof objAttribute !== 'object') return 'objAttribute would be object';
  return Object.keys(objAttribute)[0];
}

export default class Definition {
  constructor(name, value) {
    this.#name = name;
    this.value = value;
  }

  get name() { return this.#name; }

  // set name(value) { this.#name = value; }

  get value() { return this.value; }

  set value(value) { this.value = value; }
}
