import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { score, quantyAssertions } from '../redux/actions';

const second = 1000;

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      questionNumber: 0,
      displayBtn: false,
      currentTime: 30,
      disableButton: false,
      assertions: 0,
      showAsnwer: false,
    };
    this.setTime = this.setTime.bind(this);
    this.setStorage = this.setStorage.bind(this);
    this.getDifficulty = this.getDifficulty.bind(this);
  }

  componentDidMount() {
    const { gravatar } = this.props;
    const ranking = [];
    let rankingOnstorage = JSON.parse(localStorage.getItem('ranking'));
    if (rankingOnstorage !== null) {
      rankingOnstorage = [...rankingOnstorage, {
        name: '',
        score: 0,
        gravatar,
      },
      ];
      localStorage.setItem('ranking', JSON.stringify(rankingOnstorage));
    }
    if (!rankingOnstorage) {
      ranking.push({ name: '', score: 0, gravatar });
      localStorage.setItem('ranking', JSON.stringify(ranking));
    }
    const state = {
      player: {
        name: '',
        assertions: 0,
        score: 0,
        gravatarEmail: '',
      },
    };
    localStorage.setItem('state', JSON.stringify(state));
    this.getQuestions();
    setInterval(() => this.setTime(), second);
  }

  setStorage(mult) {
    const { currentTime } = this.state;
    const { name, gravatarEmail, getScore, getAssertions, gravatar } = this.props;
    const grade = 10;
    const currentScore = grade + (currentTime * mult);
    let state = JSON.parse(localStorage.getItem('state'));
    let ranking = JSON.parse(localStorage.getItem('ranking'));
    const values = ranking.map((object) => Object.values(object));
    const verifyRanking = values[0].some((item) => item === name);
    console.log(verifyRanking);
    const lastIndex = ranking.length - 1;
    if (verifyRanking === false && state.assertions > 0) {
      ranking = [...ranking, {
        name,
        score: state.player.score + currentScore,
        gravatar,
      },
    ];
      localStorage.setItem('ranking', JSON.stringify(ranking));
    } else {
      ranking = [{
        name,
        score: state.player.score + currentScore,
        gravatar }];
      state = { player: {
          name,
          assertions: state.player.assertions + 1,
          score: state.player.score + currentScore,
          gravatarEmail,
        },
      };
      localStorage.setItem('ranking', JSON.stringify(ranking));
      localStorage.setItem('state', JSON.stringify(state));
    }
    getScore(state.player.score);
    getAssertions(state.player.assertions);
  }

  getDifficulty(difficulty, condition) {
    const { assertions } = this.state;
    if (condition === 'correct') {
      this.setState({ assertions: assertions + 1 });
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
  }

  setTime() {
    const { currentTime, disableButton } = this.state;
    if (currentTime >= 1) {
      this.setState({ currentTime: currentTime - 1 });
    } if (currentTime === 0 && disableButton === false) {
      this.setState({ disableButton: true });
      this.handleClick();
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
    this.getDifficulty(difficulty, condition);
    this.setState(
      { displayBtn: true,
        showAsnwer: true },
    );
  }

  nextButton() {
    const { displayBtn } = this.state;
    if (displayBtn) {
      return (
        <button
          type="button"
          data-testid="btn-next"
          id="btn-next"
          onClick={ () => this.handleNext() }
        >
          Próxima
        </button>
      );
    }
  }

  handleNext() {
    const { questionNumber } = this.state;
    const maxQuestion = 4;
    if (questionNumber <= maxQuestion) {
      this.setState({
        currentTime: 30,
        disableButton: false,
        displayBtn: false,
        showAsnwer: false,
        questionNumber: questionNumber + 1,
      });
    }
  }

  render() {
    const {
      questions, questionNumber, currentTime, disableButton, showAsnwer } = this.state;
    const quantyQuestions = 5;
    const question = questions[questionNumber];
    if (questionNumber === quantyQuestions) return <Redirect to="/feedback" />;
    return !question ? (<p>Loading!</p>) : (
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
            className={ showAsnwer ? 'button-green' : 'button-uncolor' }
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
              className={ showAsnwer ? 'button-red' : 'button-uncolor' }
              data-testid={ `wrong-answer-${index}` }
              disabled={ disableButton }
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

const mapDispatchToProps = (dispatch) => ({
  getScore: (payload) => dispatch(score(payload)),
  getAssertions: (payload) => dispatch(quantyAssertions(payload)),
});

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
  gravatar: state.player.gravatar,
});

Questions.propTypes = {
  name: PropTypes.string,
  gravatarEmail: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
