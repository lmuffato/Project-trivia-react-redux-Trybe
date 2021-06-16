/* eslint-disable max-statements */
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
      time: 30,
      score: 0,
      arrAnswers: [],
    };
    this.renderQuestion = this.renderQuestion.bind(this);
    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    setTimeout(() => this.timer(), ONE_SECOND);
  }

  sortArr(arr) {
    const outPut = arr;
    for (let index = outPut.length; index > 0; index -= 1) {
      const index2 = Math.floor(Math.random() * (index));
      const temp = outPut[index];
      outPut[index] = outPut[index2];
      outPut[index2] = temp;
    }
    return outPut;
  }

  async timer() {
    const { time } = this.state;
    const { fetchAPI } = this.props;
    const ONE_SECOND = 1000;
    const THIRTY_SECONDS = 30;

    setInterval(() => {
      this.setState((previousState) => ({ time: previousState.time - 1 }));
    }, ONE_SECOND);
    const stopTimer = time === 0;
    await !stopTimer;
    // if (time === 0) clearInterval(interval);
    if (time === THIRTY_SECONDS) {
      fetchAPI();
    }
  }

  renderQuestion() {
    const { apiResult } = this.props;
    const { questionNumber, time } = this.state;
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
    const THIRTY_SECONDS = 30;
    const arrsort = this.sortArr(arrayAllAnswers);


    // console.log(this.state);
    // if (time > THIRTY_SECONDS - 1) {
    //   this.setState(({ arrAnswers: arrsort }));
    //   const { arrAnswers } = this.state;
      return (
        <div>
          <p data-testid="question-category">{currQuestion.category}</p>
          <h2 data-testid="question-text">{currQuestion.question}</h2>
          { arrsort }
        </div>
      );
    }
    // const { arrAnswers } = this.state;
    // return (
    //   <div>
    //     <p data-testid="question-category">{currQuestion.category}</p>
    //     <h2 data-testid="question-text">{currQuestion.question}</h2>
    //     { arrAnswers }
    //   </div>
    // );
  // }

  // categorry, question
  render() {
    const { isLoading } = this.props;
    const { time } = this.state;
    if (isLoading) return <h2>Loading...</h2>;

    return (
      <div>
        <Header />
        <p>{`Tempo: ${time} segundos`}</p>
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
