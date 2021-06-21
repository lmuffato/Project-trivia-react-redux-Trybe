import {
  CHOSE_LANGUAGE,
  UPDATE_CATEGORIES_AFTER_TRANSLATION,
} from '../actions/index';

const INITIAL_STATE = {
  questions: [],
  categories: [],
  language: 'en',
};

const gameTranslation = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CHOSE_LANGUAGE:
    return {
      ...state,
      language: action.payload,
    };
  case UPDATE_CATEGORIES_AFTER_TRANSLATION:
    if (action.payload === '') {
      return {
        ...state,
        categories: [],
      };
    }
    return {
      ...state,
      categories: [...state.categories, action.payload],
    };
  default:
    return state;
  }
};

export default gameTranslation;
