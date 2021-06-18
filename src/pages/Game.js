import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/Game.css';
import Timer from '../components/Timer';
import {
  clockStoper, disable, resetTimer, hidden, resetCurrentTime,
} from '../actions';
import {
  incrementIndex, refreshShuffle, requestQuestionsThunk,
} from '../actions/manageQuestions';
import Question from '../components/Question';

class Game extends Component {
  constructor(props) {
    super(props);

    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.incrementIndex = this.incrementIndex.bind(this);
    this.removeButtonBorder = this.removeButtonBorder.bind(this);
    this.editFuncManeger = this.editFuncManeger.bind(this);
    this.nextButtonFuncManeger = this.nextButtonFuncManeger.bind(this);
  }

  async componentDidMount() {
    await this.fetchQuestions();
    this.editShuffleArray();
    this.createLocalStorage();
  }

  createLocalStorage() {
    const { emailDoUsuario, nomeDoUsuario } = this.props;
    const state = { player: {
      name: nomeDoUsuario, assertions: 0, score: 0, gravatarEmail: emailDoUsuario,
    } };
    localStorage.setItem('state', JSON.stringify(state));
  }

  fetchQuestions() {
    const { token, getQuestions } = this.props;
    return getQuestions(token);
  }

  removeButtonBorder() {
    const buttons = document.getElementsByClassName('button');
    const buttonsArray = Array.from(buttons);
    buttonsArray.map((button) => {
      button.className = '';
      button.className = 'button';
      return button.className;
    });
  }

  incrementIndex() {
    const { editIncrementIndex } = this.props;
    editIncrementIndex();
  }

  editShuffleArray() {
    const { editShuffle, index, questions } = this.props;
    const sortControl = 0.5;
    const answers = [questions[index].correct_answer,
      ...questions[index].incorrect_answers,
    ];
    // Função baseada em um dos exemplos da página a seguir: https://www.delftstack.com/pt/howto/javascript/shuffle-array-javascript/
    const shuffle = answers.sort(() => Math.random() - sortControl);
    editShuffle(shuffle);
  }

  editFuncManeger() {
    const {
      editHidden,
      editDisable,
      editClockStoper,
      editCurrentTime,
      editResetTimer,
    } = this.props;
    editCurrentTime();
    editClockStoper(false);
    editResetTimer(true);
    editDisable(false);
    editHidden(true);
  }

  async nextButtonFuncManeger() {
    const { index, history } = this.props;
    console.log(history);
    const lastQuestion = 4;
    if (index === lastQuestion) return history.push('/feedback');
    this.removeButtonBorder();
    await this.incrementIndex();
    this.editFuncManeger();
    this.editShuffleArray();
  }

  render() {
    const {
      props:
    { emailDoUsuario, nomeDoUsuario, score, questions, hiddenBtnNext } } = this;
    const hashGerada = md5(emailDoUsuario).toString();
    if (questions.length === 0) return <h2>loading...</h2>;
    return (
      <div>
        <header>
          <img src={ `https://gravatar.com/avatar/${hashGerada}` } alt="usuário" data-testid="header-profile-picture" />
          <p data-testid="header-player-name">{nomeDoUsuario}</p>
          <span data-testid="header-score">{score}</span>
        </header>
        <main>
          <Timer />
          <Question />
          <button
            type="button"
            className={ hiddenBtnNext ? 'hidden' : 'visible' }
            data-testid="btn-next"
            onClick={ this.nextButtonFuncManeger }
          >
            Próxima
          </button>
        </main>
      </div>
    );
  }
}

const mapStateToProps = ({
  player: { email, name, token },
  gameReducer: { disableAnswer, hiddenBtnNext, currentTime, score },
  questionsReducer: { questions, index },
}) => ({
  emailDoUsuario: email,
  nomeDoUsuario: name,
  token,
  disableAnswer,
  hiddenBtnNext,
  currentTime,
  score,
  questions,
  index,
});

const mapDispatchToProps = (dispatch) => ({
  editDisable: (payload) => dispatch(disable(payload)),
  editHidden: (payload) => dispatch(hidden(payload)),
  editClockStoper: (payload) => dispatch(clockStoper(payload)),
  editCurrentTime: () => dispatch(resetCurrentTime()),
  editResetTimer: (payload) => dispatch(resetTimer(payload)),
  getQuestions: (payload) => dispatch(requestQuestionsThunk(payload)),
  editIncrementIndex: () => dispatch(incrementIndex()),
  editShuffle: (payload) => dispatch(refreshShuffle(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  emailDoUsuario: PropTypes.string,
  nomeDoUsuario: PropTypes.string,
  token: PropTypes.string,
}.isRequired;
