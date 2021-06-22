// stateClass Actions deveria estar aqui.

const initialState = {};

export default (state = initialState, { type, stateClass }) => {
  // payload
  switch (type) {
  case type:
    return { ...state, ...stateClass };
  default:
    return state;
  }
};

// class stateClassInRedux {
//   #initialState;

//   constructor(initialState) {
//     this.#initialState = initialState;
//   }

//   get initialState() { return this.#initialState; }
//   set initialState(value) { this.#initialState = value; }

// }
