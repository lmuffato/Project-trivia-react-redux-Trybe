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

    this.nextQuestion = this.nextQuestion.bind(this);

    this.state = {
      currentIndex: 0,
    };
  }

  componentDidMount() {
    const { dispatchAPI } = this.props;
    dispatchAPI();
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

  nextQuestion() {
    const { currentIndex } = this.state;
    const nextIndex = currentIndex + 1;
    if (nextIndex < TOTAL_QUESTION_NUMBER) {
      this.setState({ currentIndex: nextIndex });
    }
  }

  toResultsPage() {

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
    const { currentIndex } = this.state;
    const { questions } = this.props;

    if (questions[0]) {
      const currentQuestion = questions[currentIndex];
      const answers = [
        currentQuestion.correct_answer,
        ...currentQuestion.incorrect_answers];
      const aleatoryAnswers = this.shuffle(answers);

      if (answers.length > 2) {
        return (
          <div>
            <p data-testid="question-category">{currentQuestion.category}</p>
            <p data-testid="question-text">{currentQuestion.question}</p>
            <div>
              <button type="button">{aleatoryAnswers[0]}</button>
              <button type="button">{aleatoryAnswers[1]}</button>
              <button type="button">{aleatoryAnswers[2]}</button>
              <button type="button">{aleatoryAnswers[3]}</button>
            </div>
            {
              currentIndex > TOTAL_QUESTION_NUMBER
                ? (<button type="button" onClick={ this.nextQuestion }>Proximo</button>)
                : (<button type="button" onClick={ this.toResultsPage }>Proximo</button>)
            }

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
          {
            currentIndex > TOTAL_QUESTION_NUMBER
              ? (<button type="button" onClick={ this.nextQuestion }>Proximo</button>)
              : (<button type="button" onClick={ this.toResultsPage }>Proximo</button>)
          }
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
