import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setScoreAction } from '../actions';
import Header from './Header';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionNumber: 0,
      appear: 'none',
      seconds: 30,
    };

    this.handlePosition = this.handlePosition.bind(this);
    this.getUserRanking = this.getUserRanking.bind(this);
    this.updateLocalStorage = this.updateLocalStorage.bind(this);
    this.changeBorders = this.changeBorders.bind(this);
    this.decrementCounter = this.decrementCounter.bind(this);
  }

  componentDidMount() {
    const player = {
      player: {
        name: 'Nome da Pessoa',
        assertions: 0,
        score: 0,
        gravatarEmail: 'email@pessoa.com',
      },
    };
    localStorage.setItem('state', JSON.stringify(player));
  }

  componentDidUpdate() {
    const { seconds } = this.state;
    this.decrementCounter(seconds);
    if (seconds === 0) {
      clearInterval(seconds);
      this.changeBorders();
    }
  }

  getUserRanking(difficulty) {
    const { seconds } = this.state;
    const fixedPoint = 10;
    let finalPoint = 0;
    let difficultyPoint = 0;
    const easy = 1;
    const medium = 2;
    const hard = 3;
    const timer = seconds;
    if (difficulty === 'easy') {
      difficultyPoint = easy;
    } else if (difficulty === 'medium') {
      difficultyPoint = medium;
    } else if (difficulty === 'hard') {
      difficultyPoint = hard;
    }
    finalPoint += fixedPoint + (timer * difficultyPoint);
    this.changeBorders();
    this.updateLocalStorage(finalPoint);
  }

  decrementCounter() {
    let { seconds } = this.state;
    const miliseconds = 1000;
    const counting = setInterval(() => {
      if (seconds > 0) {
        seconds -= 1;
      } else {
        clearInterval(counting);
        this.changeBorders();
      }
    }, miliseconds);
  }

  changeBorders() {
    const correctAnswer = document.getElementsByClassName('correct-answer');
    correctAnswer[0].style.border = '3px solid rgb(6, 240, 15)';
    correctAnswer[0].disabled = true;

    const incorrectAnswer = document.querySelectorAll('.wrong-answer');
    for (let index = 0; index < incorrectAnswer.length; index += 1) {
      incorrectAnswer[index].style.border = '3px solid rgb(255, 0, 0)';
      incorrectAnswer[index].disabled = true;
    }
    this.setState({
      appear: '',
    });
    clearInterval(this.decrementCounter());
  }

  updateLocalStorage(score) {
    const { getName, getUrl, getScore } = this.props;
    const ranking = [
      { name: getName, score, picture: getUrl },
    ];
    const player = {
      player: {
        name: getName,
        assertions: 0,
        score,
        gravatarEmail: 'email@pessoa.com',
      },
    };

    localStorage.setItem('ranking', JSON.stringify(ranking));
    localStorage.setItem('state', JSON.stringify(player));
    getScore(score);
  }
  // função para quando clicar ir para a proxima pergunta

  proximaPergunta() {
    const { questions } = this.props;
    let { questionNumber } = this.state;
    if (questionNumber <= questions.length - 1) {
      questionNumber += 1;
      this.setState({
        questionNumber: questionNumber + 1,
      });
    }
    console.log('clickX');
  }

  handlePosition() {
    const { questions } = this.props;
    const questionsFilter = questions
      .filter((question) => questions.indexOf(question) === 0);
    return questionsFilter.map((question) => (
      <div key={ question }>
        <h3 data-testid="question-category">
          {question.category}
        </h3>
        <br />
        <h2 data-testid="question-text">
          {question.question}
        </h2>
        <br />
        {question.incorrect_answers.map((incorrect, index) => (
          <button
            data-testid={ `wrong-answer-${index}` }
            key={ index }
            type="button"
            onClick={ this.changeBorders }
            className="wrong-answer responses"
          >
            {incorrect}

          </button>
        ))}

        <button
          data-testid="correct-answer"
          type="button"
          onClick={ () => this.getUserRanking(question.difficulty) }
          className="correct-answer responses"
        >
          {question.correct_answer}
        </button>
      </div>

    ));
  }

  render() {
    const { seconds, appear } = this.state;
    console.log(this.props);
    return (
      <>
        <Header />
        <div>
          <span>Tempo Restante: </span>
          <strong>{seconds}</strong>
          {this.handlePosition()}
          <button
            style={ { display: appear } }
            className="next"
            data-testid="btn-next"
            type="submit"
            onClick={ this.proximaPergunta() }
          >
            Próxima
          </button>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getScore: (state) => dispatch(setScoreAction(state)),
});

const mapStateToProps = (state) => ({
  questions: state.game.questions,
  isLoading: state.game.isLoading,
  getName: state.player.name,
  getScore: state.player.score,
  getUrl: state.player.gravatar,
});

Game.propTypes = {
  questions: PropTypes.string.isRequired,
  getName: PropTypes.string.isRequired,
  getScore: PropTypes.number.isRequired,
  getUrl: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
