// eslint-disable-next-line import/no-cycle
// import store from '../store';

const SET_STATE_CLASS = 'SET_STATE_CLASS';
// const initialState = {};
class StateClassInRedux {
  // clazz;
  // initialState;
  // static SET_STATE_CLASS = 'SET_STATE_CLASS';

  constructor(clazz, initialState) {
    this.clazz = clazz.name;
    this.initialState = initialState.state;
    this.value = initialState;
  }

  /**
   * Reducer Default
   * @return Function
   */
  static reducer() {
    return (state = {}, { type, payload }) => {
      switch (type) {
      case SET_STATE_CLASS:
        return { ...state, [payload.nameClass]: payload.stateClass };
      default:
        return state;
      }
    };
  }

  // setStateInRedux() {
  //   store.dispatch(this.action());
  // }

  // get initialState() { return this.initialState; }
  // set initialState(value) { this.initialState = value; }

  action() { // action creator
    this.nameClass = this.clazz;
    this.stateClass = this.initialState;
    const state = {
      nameClass: this.nameClass,
      stateClass: this.stateClass,
    };
    const result = {
      type: SET_STATE_CLASS, // 'SET_STATE_CLASS'
      payload: state, // { this.nameClass, this.stateClass }
    };
    return result;
  }

  static setStateInRedux(dispatch) {
    return {
      setStateInRedux: (action) => dispatch(action),
    };
  }
}

export default StateClassInRedux;
