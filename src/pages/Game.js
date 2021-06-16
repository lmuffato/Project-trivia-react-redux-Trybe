import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getApiQuestionsThunk } from '../actions';
import Header from './Header';

class Game extends React.Component {
  componentDidMount() {
    const { getThunk } = this.props;
    getThunk();
  }

  render() {
    const { results } = this.props;
    console.log(results);
    return (
      <>
        <Header />
        <div>
          <h1>Answer the right question: </h1>
          <ul>
            {results.map((result, index) => (
              <li
                data-testid="question-category"
                key={ index }
              >
                {result.category}
              </li>
            ))}
          </ul>
          <ul>
            {results.map((result, index) => (
              <li
                key={ index }
                data-testid="question-text"
              >
                { result.question }
              </li>
            ))}
          </ul>
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
  getThunk: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
