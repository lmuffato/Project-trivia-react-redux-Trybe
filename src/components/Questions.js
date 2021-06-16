import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import setAttribute from '../services/setAttribute';
import shuffle from '../services/shuffle';
import changeColors from '../services/changeColors';
import disableBtns from '../services/disableBtns';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      nextBtn: false,
      timer: 30,
    };

    this.renderQuestion = this.renderQuestion.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.updateTimer = this.updateTimer.bind(this);
    this.stopInterval = this.stopInterval.bind(this);
  }

  componentDidMount() {
    this.updateTimerFunc();
  }

  handleClick() {
    const { index } = this.state;
    this.setState({ index: index + 1 });
  }

  checkAnswer() {
    changeColors();
    this.setState({ nextBtn: true });
  }

  showNextBtn() {
    return (
      <button
        type="button"
        onClick={ this.handleClick }
        data-testid="btn-next"
      >
        Proxima
      </button>
    );
  }

  updateTimer() {
    const { timer } = this.state;
    this.setState({ timer: timer - 1 });
  }

  updateTimerFunc() {
    const seconds = 1000;
    const maxTime = 30000;
    const myInterval = setInterval(this.updateTimer, seconds);
    setTimeout(() => this.stopInterval(myInterval), maxTime);
    return myInterval;
  }

  stopInterval(myInterval) {
    this.setState({ nextBtn: true });
    disableBtns();
    clearInterval(myInterval);
  }

  renderQuestion(results, index) {
    const { timer } = this.state;
    const correctAnswer = [{
      answer: results[index].correct_answer,
      attribute: 'correct-answer',
    }];
    const incorrectAnswers = [...results[index].incorrect_answers];
    const incorrectWAtt = setAttribute(incorrectAnswers);
    const answers = [...correctAnswer, ...incorrectWAtt];
    const randomAnswers = shuffle(answers);
    console.log(randomAnswers);
    return (
      <>
        <h3 data-testid="question-text">{results[index].question}</h3>
        <p data-testid="question-category">
          Category:
          { results[index].category }
        </p>
        <p>
          tempo
          { timer }
        </p>
        <div>Respostas ;</div>
        {randomAnswers.map((elem) => (
          <button
            key={ elem.answer }
            type="button"
            data-testid={ elem.attribute }
            onClick={ this.checkAnswer }
            className="answer"
          >
            {elem.answer}
          </button>))}
      </>
    );
  }

  render() {
    const { index, nextBtn } = this.state;
    const { results } = this.props;
    return (
      <div>
        {results.length !== 0
        && this.renderQuestion(results, index)}
        <br />
        {nextBtn
        && this.showNextBtn()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  results: state.game.perguntas,
});

Question.propTypes = {
  results: PropTypes.shape.isRequired,
};

export default connect(mapStateToProps)(Question);
