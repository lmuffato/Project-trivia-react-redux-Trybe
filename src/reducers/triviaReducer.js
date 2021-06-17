import {
  GET_QUESTIONS,
  GET_QUESTIONS_SUCCESS,
  FILTER,
  GET_SECONDS,
  SHOULD_TIMER_RESTART,
} from '../actions';

const INITIAL_STATE = {
  questions: [],
  isLoading: true,
  categories: [
    {
      id: 9,
      name: 'General Knowledge',
    },
    {
      id: 10,
      name: 'Entertainment: Books',
    },
    {
      id: 11,
      name: 'Entertainment: Film',
    },
    {
      id: 12,
      name: 'Entertainment: Music',
    },
    {
      id: 13,
      name: 'Entertainment: Musicals & Theatres',
    },
    {
      id: 14,
      name: 'Entertainment: Television',
    },
    {
      id: 15,
      name: 'Entertainment: Video Games',
    },
    {
      id: 16,
      name: 'Entertainment: Board Games',
    },
    {
      id: 17,
      name: 'Science & Nature',
    },
    {
      id: 18,
      name: 'Science: Computers',
    },
    {
      id: 19,
      name: 'Science: Mathematics',
    },
    {
      id: 20,
      name: 'Mythology',
    },
    {
      id: 21,
      name: 'Sports',
    },
    {
      id: 22,
      name: 'Geography',
    },
    {
      id: 23,
      name: 'History',
    },
    {
      id: 24,
      name: 'Politics',
    },
    {
      id: 25,
      name: 'Art',
    },
    {
      id: 26,
      name: 'Celebrities',
    },
    {
      id: 27,
      name: 'Animals',
    },
    {
      id: 28,
      name: 'Vehicles',
    },
    {
      id: 29,
      name: 'Entertainment: Comics',
    },
    {
      id: 30,
      name: 'Science: Gadgets',
    },
    {
      id: 31,
      name: 'Entertainment: Japanese Anime & Manga',
    },
    {
      id: 32,
      name: 'Entertainment: Cartoon & Animations',
    },
  ],
  filters: '',
  seconds: 0,
  shouldTimerRestart: false,
};

export default function triviaReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_QUESTIONS:
    return {
      ...state,
      isLoading: true,
    };
  case GET_QUESTIONS_SUCCESS:
    return {
      ...state,
      questions: action.payload,
      isLoading: false,
    };

  case FILTER:
    return {
      ...state,
      filters: action.payload,
    };
  
  case GET_SECONDS:
    return {
      ...state,
      seconds: action.payload,
    };
  case SHOULD_TIMER_RESTART:
    return { ...state, shouldTimerRestart: action.payload };

  default:
    return state;
  }
}
