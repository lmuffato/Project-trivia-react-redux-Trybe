import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setScore, timer } from '../actions';

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.handleScore = this.handleScore.bind(this);
    this.decreaseTimer = this.decreaseTimer.bind(this);

    this.state = {
      addClass: false,
      isVisible: false,
    };
  }

  componentDidMount() {
    this.decreaseTimer();
  }

  getDifficultScore(difficult) {
    const SCORE_EASY = 1;
    const SCORE_MEDIUM = 2;
    const SCORE_HARD = 3;

    switch (difficult) {
    case 'easy':
      return SCORE_EASY;
    case 'medium':
      return SCORE_MEDIUM;
    default:
      return SCORE_HARD;
    }
  }

  getScore() {
    const { time, setScoreTotal, question: { difficulty } } = this.props;
    const BASE_SCORE = 10;
    const difficultyScore = this.getDifficultScore(difficulty);
    const finalScore = BASE_SCORE + (time * difficultyScore);
    setScoreTotal(finalScore);
  }

  decreaseTimer() {
    const INTERVAL = 1000;

    setInterval(() => {
      const { time, dispatchTimer } = this.props;
      const remainTime = time - 1;
      if (remainTime > 0) {
        dispatchTimer(remainTime);
      } else if (remainTime === 0) {
        dispatchTimer(remainTime);
        this.setState({ isVisible: true });
      }
    }, INTERVAL);
  }

  decodeHtml(html) {
    const texto = document.createElement('textarea');
    texto.innerHTML = html;
    return texto.value;
  }

  handleScore({ target }) {
    this.setState({
      addClass: true,
      isVisible: true,
    });
    if (target.name === 'correct-answer') this.getScore();
  }

  buttonNext() {
    return (
      <button
        type="button"
        data-testid="btn-next"
        className="invisible-btn"
      >
        Próxima
      </button>
    );
  }

  render() {
    const { question, time } = this.props;
    const { addClass, isVisible } = this.state;
    return (
      <section>
        { time > 0 ? <span>{time}</span> : <span>Terminou</span>}
        <p data-testid="question-category">{ question.category }</p>
        <p data-testid="question-text">{ this.decodeHtml(question.question) }</p>
        { question.randomAnswers.map((answer, index) => {
          if (answer.correct) {
            return (
              <button
                data-testid="correct-answer"
                name="correct-answer"
                type="button"
                className={ addClass ? 'correct-answer' : 'qualquer-classe' }
                disabled={ time <= 0 }
                onClick={ this.handleScore }
              >
                { this.decodeHtml(answer.correct) }
              </button>);
          }
          return (
            <button
              data-testid={ `wrong-answer-${index}` }
              name="wrong-answer"
              type="button"
              key={ `wrong-answer-${index}` }
              onClick={ this.handleScore }
              disabled={ time <= 0 }
              className={ addClass ? 'wrong-answer' : 'qualquer-classe' }
            >
              { this.decodeHtml(answer.incorrect) }
            </button>);
        })}
        { isVisible && this.buttonNext() }
      </section>
    );
  }
}

Question.propTypes = {
  question: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  dispatchTimer: PropTypes.func.isRequired,
  setScoreTotal: PropTypes.func.isRequired,
};

const mapStateToProps = ({ trivia }) => ({
  time: trivia.tempo,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchTimer: (time) => dispatch(timer(time)),
  setScoreTotal: (score) => dispatch(setScore(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
