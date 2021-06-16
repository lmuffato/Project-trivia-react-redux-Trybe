import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getApiQuestionsThunk } from '../actions';

class Pergunta extends React.Component {
  render() {
    const { results, questionNumber } = this.props;
    return (
      <div>
        {results.map((result, index) => (
          <div
            key={ index }
            data-testid="question-text"
          >
            { index === questionNumber ? `Pergunta: ${result.question}` : '' }
          </div>
        ))}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getThunk: (state) => dispatch(getApiQuestionsThunk(state)),
});

const mapStateToProps = (state) => ({
  results: state.game.questions,
  isLoading: state.game.isLoading,
  questionNumber: state.game.questionNumber,
});

Pergunta.propTypes = {
  results: PropTypes.string.isRequired,
  questionNumber: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Pergunta);
