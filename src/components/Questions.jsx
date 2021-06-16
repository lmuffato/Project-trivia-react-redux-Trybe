import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      questionNumber: 0,
      displayBtn: false,
    };
  }

  componentDidMount() {
    this.getQuestions();
  }

  async getQuestions() {
    const getToken = localStorage.getItem('token');
    const fetchApi = await fetch(`https://opentdb.com/api.php?amount=5&token=${getToken}`);
    const response = await fetchApi.json();
    const questions = await response.results;
    this.setState({ questions });
  }

  handleClick() {
    const green = '3px solid rgb(6, 240, 15)';
    const red = '3px solid rgb(255, 0, 0)';
    const right = document.getElementById('correct-answer');
    right.style.border = green;
    const wrong = document.getElementsByClassName('wrong-answer');
    const array = Array.prototype.slice.call(wrong);
    array.map((button) => {
      button.style.border = red;
      return button.style.border;
    });
    this.setState({ displayBtn: true });
  }

  nextButton() {
    const { displayBtn } = this.state;
    if (displayBtn) {
      return (
        <button
          type="button"
          data-testid="btn-next"
          id="btn-next"
        >
          Próxima
        </button>
      );
    }
    return <div />;
  }

  render() {
    const { questions, questionNumber } = this.state;
    const question = questions[questionNumber];
    const { disableButton } = this.props;
    return !question ? (
      <p>Loading!</p>
    ) : (
      <div>
        <div>
          <h4
            data-testid="question-category"
          >
            {question.category}
          </h4>
          <p
            data-testid="question-text"
          >
            {question.question}
          </p>
          <button
            type="button"
            data-testid="correct-answer"
            disabled={ disableButton }
            id="correct-answer"
            onClick={ () => this.handleClick() }
          >
            {question.correct_answer}
          </button>
          {question.incorrect_answers.map((incorrect, index) => (
            <button
              key={ index }
              type="button"
              data-testid={ `wrong-answer-${index}` }
              disabled={ disableButton }
              className="wrong-answer"
              onClick={ () => this.handleClick() }
            >
              {incorrect}
            </button>
          ))}
          {this.nextButton()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  disableButton: state.disableButton.disableByTime,
});

Questions.propTypes = {
  disableButton: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps, null)(Questions);
