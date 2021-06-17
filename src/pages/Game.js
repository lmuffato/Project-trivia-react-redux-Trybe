import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getApiQuestionsThunk } from '../actions';
import Header from './Header';

class Game extends React.Component {
  constructor() {
    super();
    this.handlePosition = this.handlePosition.bind(this);
  }

  handlePosition() {
    const { results } = this.props;
    if (!results) {
      return;
    }
    const categoryFilter = results.filter((category) => results.indexOf(category) === 0);
    return categoryFilter.map((category) => (
      <div key={ category }>
        <h3 data-testid="question-category">
          {category.category}
        </h3>
        <br />
        <h2 data-testid="question-text">
          {category.question}
        </h2>
        <br />
        {category.incorrect_answers.map((incorrect, index) => (
          <button
            data-testid={ `wrong-answer-${index}` }
            key={ index }
            type="button"
          >
            {incorrect}

          </button>
        ))}
        <button
          data-testid="correct-answer"
          type="button"
        >
          {category.correct_answer}

        </button>

      </div>));
  }

  render() {
    return (
      <>
        <Header />
        <div>
          {this.handlePosition()}
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getThunk: (state) => dispatch(getApiQuestionsThunk(state)),
});

const mapStateToProps = (state) => ({
  results: state.game.questions,
  isLoading: state.game.isLoading,
});

Game.propTypes = {
  results: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
