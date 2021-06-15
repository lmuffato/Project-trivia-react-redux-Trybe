import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import Header from '../components/Header';
import { fetchAPIThunk } from '../actions/index';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questionNumber: 0,
    };
    this.renderQuestion = this.renderQuestion.bind(this);
  }

  componentDidMount() {
    const { fetchAPI } = this.props;
    fetchAPI();
  }

  renderQuestion() {
    const { apiResult } = this.props;
    const { questionNumber } = this.state;
    const { results } = apiResult;
    if (results === undefined) return;
    const currQuestion = results[questionNumber];
    const correctQuestion = (
      <button type="button" data-testid="correct-answer">
        {currQuestion.correct_answer}
      </button>);
    const arrayInCorretAnswers = currQuestion.incorrect_answers
      .map((answer, index) => (
        <button
          type="button"
          key={ index }
          data-testid={ `wrong-answer-${index}` }
        >
          { answer }
        </button>
      ));

    const arrayAllAnswers = arrayInCorretAnswers.concat(correctQuestion);
    for (let index = arrayAllAnswers.length; index > 0; index -= 1) {
      const index2 = Math.floor(Math.random() * (index));
      const temp = arrayAllAnswers[index];
      arrayAllAnswers[index] = arrayAllAnswers[index2];
      arrayAllAnswers[index2] = temp;
    }

    return (
      <div>
        <p data-testid="question-category">{currQuestion.category}</p>
        <h2 data-testid="question-text">{currQuestion.question}</h2>
        { arrayAllAnswers }
      </div>
    );
  }

  // categorry, question
  render() {
    const { isLoading } = this.props;
    if (isLoading) return <h2>Loading...</h2>;

    return (
      <div>
        <Header />
        <div>
          {this.renderQuestion()}
        </div>
        <button type="button">PRÓXIMA</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchAPI: () => dispatch(fetchAPIThunk()),
});

const mapStateToProps = ({ apiResponse: { apiResult, isLoading } }) => ({
  apiResult,
  isLoading,
});

Game.propTypes = {
  fetchAPI: Proptypes.func.isRequired,
  apiResult: Proptypes.arrayOf(Object).isRequired,
  isLoading: Proptypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
