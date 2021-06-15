import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
// import { getQuestions } from '../services/triviaAPI';
import { getAPIThunk } from '../redux/actions/actions';

const TOTAL_QUESTION_NUMBER = 4;

class Jogo extends Component {
  constructor(props) {
    super(props);
    const { questions } = this.props;

    this.state = {
      questions,
      randomNumberArray: [],
    };
  }

  componentDidMount() {
    const { dispatchAPI } = this.props;
    dispatchAPI();
  }

  getRandomNumber() {
    const { randomNumberArray } = this.state;
    let randomNumber = 0;

    while (randomNumberArray.length < TOTAL_QUESTION_NUMBER) {
      const random = Math.floor(Math.random() * TOTAL_QUESTION_NUMBER); // 0 e 3

      if (!randomNumberArray.includes(randomNumber)) {
        this.setState({ randomNumberArray: [...randomNumberArray, random] });
        randomNumber = random;
        break;
      }
    }

    return randomNumber;
  }

  // link: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  shuffle(array) {
    let currentIndex = array.length; let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  renderGravatarImage() {
    const { email } = this.props;
    const hashMD5 = md5(email).toString();
    return (
      <img
        src={ `https://www.gravatar.com/avatar/${hashMD5}` }
        alt="avatar"
        data-testid="header-profile-picture"
      />);
  }

  renderQuestions() {
    const { questions } = this.state;

    if (questions[0]) {
      const currentQuestion = questions[0];

      let answers = [
        currentQuestion.correct_answer,
        ...currentQuestion.incorrect_answers];

      answers = this.shuffle(answers);

      if (answers.length > 2) {
        return (
          <div>
            <span data-testid="question-category">{currentQuestion.category}</span>
            <p data-testid="question-text">{currentQuestion.question}</p>
            <div>
              <button type="button">{answers[0]}</button>
              <button type="button">{answers[1]}</button>
              <button type="button">{answers[2]}</button>
              <button type="button">{answers[3]}</button>
            </div>
          </div>
        );
      }

      return (
        <div>
          <span data-testid="question-category">{currentQuestion.category}</span>
          <p data-testid="question-text">{currentQuestion.question}</p>
          <div>
            <button type="button">True</button>
            <button type="button">False</button>
          </div>
        </div>
      );
    }
  }

  render() {
    const { nome } = this.props;

    return (
      <div>
        <header>
          {this.renderGravatarImage()}
          <span data-testid="header-player-name">{ nome }</span>
          <span data-testid="header-score">0</span>
        </header>
        <h1>Página do Jogo</h1>
        {this.renderQuestions()}
      </div>
    );
  }
}

Jogo.propTypes = {
  email: PropTypes.string,
  nome: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.loginReducer.email,
  nome: state.loginReducer.nome,
  questions: state.jogoReducer.results,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchAPI: (payload) => dispatch(getAPIThunk(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Jogo);
