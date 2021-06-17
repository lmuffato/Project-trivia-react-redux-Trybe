import React, { Component } from 'react';
import { connect } from 'react-redux';

const second = 1000;

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      questionNumber: 0,
      displayBtn: false,
      currentTime: 30,
      disableButton: false,
      assertions: 0,
    };
    this.setTime = this.setTime.bind(this);
    this.setStorage = this.setStorage.bind(this);
    this.getDifficulty = this.getDifficulty.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
    setInterval(() => this.setTime(), second);
  }

  setStorage(mult) {
    const { currentTime, assertions } = this.state;
    const { name, gravatarEmail } = this.props;
    const grade = 10;
    const currentScore = grade + (currentTime * mult);
    console.log(currentScore);
    let state = {
      player: {
        name,
        assertions: assertions + 1,
        score: currentScore,
        gravatarEmail,
      },
    };
    if (localStorage.getItem('state') !== null) {
      state = JSON.parse(localStorage.getItem('state'));
      state = {
        player: {
          ...state.player,
          assertions: state.player.assertions + 1,
          score: state.player.score + currentScore,
        },
      };
      localStorage.setItem('state', JSON.stringify(state));
    } else {
      localStorage.setItem('state', JSON.stringify(state));
    }
  }

  getDifficulty(difficulty, condition) {
    const { assertions } = this.state;
    if (condition === 'correct') {
      this.setState({ assertions: assertions + 1 });
    }
    let mult;
    switch (difficulty) {
    case 'easy':
      mult = 1;
      break;
    case 'medium':
      mult = 2;
      break;
    default:
      mult = 2 + 1;
    }
    this.setStorage(mult);
  }

  setTime() {
    const { currentTime, disableButton } = this.state;
    if (currentTime >= 1) {
      this.setState({ currentTime: currentTime - 1 });
    } if (currentTime === 0 && disableButton === false) {
      this.setState({ disableButton: true });
    } else {
      return null;
    }
  }

  async getQuestions() {
    const getToken = localStorage.getItem('token');
    const fetchApi = await fetch(`https://opentdb.com/api.php?amount=5&token=${getToken}`);
    const response = await fetchApi.json();
    const questions = await response.results;
    this.setState({ questions });
  }

  handleClick(difficulty, condition) {
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
    this.getDifficulty(difficulty, condition);
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
    const { questions, questionNumber, currentTime, disableButton } = this.state;
    const question = questions[questionNumber];
    return !question ? (
      <p>Loading!</p>
    ) : (
      <div>
        <div>
          { currentTime }
        </div>
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
            onClick={ () => this.handleClick(question.difficulty, 'correct') }
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
              onClick={ () => this.handleClick(question.difficulty, 'wrong') }
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
  gravatarEmail: state.login.gravatarEmail,
  name: state.login.name,
});

export default connect(mapStateToProps, null)(Questions);
