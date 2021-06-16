import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getApiQuestionsThunk } from '../actions';
import Header from './Header';
import Categoria from './Categoria';
import Pergunta from './Pergunta';

class Game extends React.Component {
  async componentDidMount() {
    const { getThunk } = this.props;
    await getThunk();
  }

  render() {
    const { results, questionNumber } = this.props;
    return (
      <>
        <Header />
        <Categoria />
        <Pergunta />
        <div>
          <br />
          <br />
          <div>
            {results.map((result, index) => (
              <div key={ index }>
                {
                  (index === questionNumber)
                    ? <>
                      <button type="submit" data-testid="correct-answer">
                        { result.correct_answer }
                      </button>

                      { result.incorrect_answers.map((wrongAnswers) => (
                        <button
                          type="submit"
                          key={ index }
                          data-testid={ `wrong-answer-${index}` }
                        >
                          { wrongAnswers }
                        </button>
                      ))}
                    </>
                    : '' }
              </div>
            ))}
          </div>
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
  questionNumber: state.game.questionNumber,
});

Game.propTypes = {
  results: PropTypes.string.isRequired,
  questionNumber: PropTypes.number.isRequired,
  getThunk: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
