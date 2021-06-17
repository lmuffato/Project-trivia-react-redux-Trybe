import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getQuestions } from '../services/dataApi';
import '../styles/Game.css';
import Timer from '../components/Timer';
import { disable, hidden } from '../actions';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
      index: 0,
      shuffle: [],
    };

    this.wrongIndex = -1;

    this.handleFunc = this.handleFunc.bind(this);
    this.incrementIndex = this.incrementIndex.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
    this.createButton = this.createAnswersButtons.bind(this);
    this.removeButtonBorder = this.removeButtonBorder.bind(this);
    this.editDisableAndHidden = this.editDisableAndHidden.bind(this);
    this.funcManeger = this.funcManeger.bind(this);
  }

  async componentDidMount() {
    await this.handleFunc();
    this.shuffleArray();
  }

  handleFunc() {
    const { token } = this.props;
    return getQuestions(token)
      .then((data) => this.setState({
        questions: data.results,
      }));
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
    const { index } = this.state;
    this.setState({
      index: index + 1,
    });
    // console.log(index);
    this.wrongIndex = -1;
  }

  editDisableAndHidden() {
    const { editHidden, editDisable } = this.props;
    editDisable(false);
    editHidden(true);
  }

  async funcManeger() {
    this.removeButtonBorder();
    await this.incrementIndex();
    this.editDisableAndHidden();
    this.shuffleArray();
  }

  // Função baseada em um dos exemplos da página a seguir: https://www.delftstack.com/pt/howto/javascript/shuffle-array-javascript/
  shuffleArray() {
    const { questions, index } = this.state;
    // console.log(index);
    const sortControl = 0.5;
    const answers = [questions[index].correct_answer,
      ...questions[index].incorrect_answers,
    ];
    const shuffle = answers.sort(() => Math.random() - sortControl);
    this.setState({
      shuffle,
    });
  }

  createAnswersButtons(answer, i) {
    const { disableAnswer } = this.props;
    const { questions, index } = this.state;
    if (answer === questions[index].correct_answer) {
      return (
        <button
          key={ i }
          type="button"
          disabled={ disableAnswer }
          name="correct-answer"
          className="button"
          data-testid="correct-answer"
          onClick={ this.checkAnswer }
        >
          {answer}
        </button>
      );
    }
    this.wrongIndex += 1;
    return (
      <button
        key={ i }
        type="button"
        disabled={ disableAnswer }
        name="wrong-answer"
        className="button"
        data-testid={ `wrong-answer-${this.wrongIndex}` }
        onClick={ this.checkAnswer }
      >
        {answer}
      </button>
    );
  }

  checkAnswer() {
    const { editHidden } = this.props;
    editHidden(false);
    const buttons = document.getElementsByClassName('button');
    const buttonsArray = Array.from(buttons);
    buttonsArray.map((button) => {
      if (button.name === 'correct-answer') {
        return button.classList.add('correctAnswer');
      }
      return button.classList.add('wrongAnswer');
    });
  }

  render() {
    const { emailDoUsuario, nomeDoUsuario, hiddenBtnNext } = this.props;
    const { questions, index, shuffle } = this.state;
    const hashGerada = md5(emailDoUsuario).toString();
    if (questions.length === 0) return <h2>loading...</h2>;
    return (
      <div>
        <header>
          <img src={ `https://gravatar.com/avatar/${hashGerada}` } alt="usuário" data-testid="header-profile-picture" />
          <p data-testid="header-player-name">{nomeDoUsuario}</p>
          <p data-testid="header-score">0</p>
        </header>
        <main>
          <Timer />
          <h2 data-testid="question-category">
            {questions[index].category}
          </h2>
          <p data-testid="question-text">
            {questions[index].question}
          </p>
          {shuffle.map((answer, i) => this.createAnswersButtons(answer, i))}
          <button
            type="button"
            className={ hiddenBtnNext ? 'hidden' : 'visible' }
            data-testid="btn-next"
            onClick={ this.funcManeger }
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
  gameReducer: { disableAnswer, hiddenBtnNext } }) => ({
  emailDoUsuario: email,
  nomeDoUsuario: name,
  token,
  disableAnswer,
  hiddenBtnNext,
});

const mapDispatchToProps = (dispatch) => ({
  editDisable: (payload) => dispatch(disable(payload)),
  editHidden: (payload) => dispatch(hidden(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  emailDoUsuario: PropTypes.string,
  nomeDoUsuario: PropTypes.string,
  token: PropTypes.string,
}.isRequired;
