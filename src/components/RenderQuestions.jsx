import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import '../css/Answers.css';

class RenderQuestions extends Component {
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

  handleAnswerClick() {
    const correct = document.getElementsByClassName('correct-answer');
    correct[0].className = 'correct';
    const incorrect = document.querySelectorAll('.wrong-answer');
    for (let i = 0; i < incorrect.length; i += 1) {
      incorrect[i].className = 'incorrect';
    }
  }

  renderQuestion() {
    const { apiResult, question, timeOut } = this.props;
    const { results } = apiResult;
    if (results === undefined) return;
    const currQuestion = results[question];
    const correctQuestion = (
      <button
        disabled={ timeOut }
        key={ 5 }
        type="button"
        data-testid="correct-answer"
        onClick={ this.handleAnswerClick }
        className="correct-answer"
      >
        {currQuestion.correct_answer}
      </button>);
    const arrayInCorretAnswers = currQuestion.incorrect_answers
      .map((answer, index) => (
        <button
          type="button"
          key={ index }
          disabled={ timeOut }
          data-testid={ `wrong-answer-${index}` }
          onClick={ this.handleAnswerClick }
          className="wrong-answer"
        >
          { answer }
        </button>
      ));
    const arrayAllAnswers = arrayInCorretAnswers.concat(correctQuestion);
    const arrsort = this.sortArr(arrayAllAnswers);
    return (
      <div>
        <p data-testid="question-category">{currQuestion.category}</p>
        <h2 data-testid="question-text">{currQuestion.question}</h2>
        { arrsort }
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderQuestion()}
      </div>
    );
  }
}
const mapStateToProps = ({ apiResponse: { apiResult }, player: { timeOut } }) => ({
  apiResult,
  timeOut,
});

RenderQuestions.propTypes = {
  apiResult: Proptypes.arrayOf(Object),
}.isRequired;

export default connect(mapStateToProps)(RenderQuestions);
