import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getQuestions } from '../services/dataApi';
import '../styles/Game.css';
import Timer from '../components/Timer';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
      index: 0,
    };

    this.wrongIndex = -1;

    this.handleFunc = this.handleFunc.bind(this);
    this.incrementIndex = this.incrementIndex.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
    this.createButton = this.createButton.bind(this);
  }

  componentDidMount() {
    this.handleFunc();
  }

  handleFunc() {
    const { token } = this.props;
    console.log(token);
    return getQuestions(token)
      .then((data) => this.setState({
        questions: data.results,
      }));
  }

  incrementIndex() {
    const { index } = this.state;
    this.setState({
      index: index + 1,
    });
    this.wrongIndex = -1;
    const buttons = document.getElementsByClassName('button');
    const buttonsArray = Array.from(buttons);
    console.log(buttonsArray);
    buttonsArray.map((button) => {
      button.className = '';
      button.className = 'button';
      return button.className;
    });
  }

  // Função baseada em um dos exemplos da página a seguir: https://www.delftstack.com/pt/howto/javascript/shuffle-array-javascript/
  shuffleArray(inputArray) {
    const sortControl = 0.5;
    return inputArray.sort(() => Math.random() - sortControl);
  }

  createButton(answer, i) {
    const { disable } = this.props;
    const { questions, index } = this.state;
    if (answer === questions[index].correct_answer) {
      return (
        <button
          key={ i }
          type="button"
          disabled={ disable }
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
        disabled={ disable }
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
    const buttons = document.getElementsByClassName('button');
    const buttonsArray = Array.from(buttons);
    console.log(buttonsArray);
    buttonsArray.map((button) => {
      if (button.name === 'correct-answer') {
        return button.classList.add('correctAnswer');
        // return button.classList;
      }
      return button.classList.add('wrongAnswer');
      //  button.classList;
    });
  }

  render() {
    const { emailDoUsuario, nomeDoUsuario } = this.props;
    const hashGerada = md5(emailDoUsuario).toString();
    const { questions, index } = this.state;
    if (questions.length === 0) return <h2>loading...</h2>;
    const answers = [questions[index].correct_answer,
      ...questions[index].incorrect_answers,
    ];
    return (
      <div>
        <header>
          <img src={ `https://br.gravatar.com/site/implement/${hashGerada}` } alt="usário" data-testid="header-profile-picture" />
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
          {this.shuffleArray(answers).map((answer, i) => this.createButton(answer, i))}
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.incrementIndex }
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
  gameReducer: { disable } }) => ({
  emailDoUsuario: email,
  nomeDoUsuario: name,
  token,
  disable,
});

export default connect(mapStateToProps, null)(Game);

Game.propTypes = {
  emailDoUsuario: PropTypes.string,
  nomeDoUsuario: PropTypes.string,
  token: PropTypes.string,
}.isRequired;
