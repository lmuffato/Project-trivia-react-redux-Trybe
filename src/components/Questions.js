import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import setAttribute from '../services/setAttribute';
import shuffle from '../services/shuffle';
import changeColors from '../services/changeColors';
import disableBtns from '../services/disableBtns';
import setPoints from '../services/setPoints';
import { getPlacar } from '../redux/actions';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      nextBtn: false,
      timer: 30,
      assertions: 0,
      redirect: false,
      score: 0,
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

  clearAllIntervals() {
    for (let i = 0; i < 100; i += 1) {
      window.clearInterval(i);
      window.clearTimeout(i);
    }
  }

  handleClick() {
    const { index } = this.state;
    const indexMax = 4;
    if (index === indexMax) {
      this.setState({ redirect: true });
    } else {
      this.setState({ index: index + 1 });
      this.setState({ nextBtn: false });
      this.clearAllIntervals();
      this.setState({ timer: 30 });
      this.updateTimerFunc();
    }
  }

  checkAnswer(e, timer, difficulty) {
    const { setPointsRedux, name, email } = this.props;
    const { assertions, score } = this.state;
    let actAss = assertions;
    changeColors();
    this.setState({ nextBtn: true });
    const points = setPoints(e, timer, difficulty);
    if (points !== 0) {
      this.setState({ assertions: assertions + 1 });
      setPointsRedux({ placar: points });
      this.setState({ score: score + +points });
      actAss = assertions + 1;
    }
    const player = {
      player: {
        name,
        assertions: actAss,
        score: score + points,
        gravatarEmail: email,
      },
    };
    localStorage.setItem('state', JSON.stringify(player));
  }

  showNextBtn() {
    const { redirect } = this.state;
    return (
      <>
        <button
          type="button"
          onClick={ this.handleClick }
          data-testid="btn-next"
        >
          Proxima
        </button>
        {redirect && <Redirect to="/feedback" />}
      </>
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
    return (
      <>
        <h3 data-testid="question-text">{results[index].question}</h3>
        <p data-testid="question-category">
          Category:
          { results[index].category }
        </p>
        <p>
          tempo
          :
          { timer }
        </p>
        <p>
          dificuldade
          :
          {results[index].difficulty}
        </p>
        <div>Respostas</div>
        {randomAnswers.map((elem) => (
          <button
            key={ elem.answer }
            type="button"
            data-testid={ elem.attribute }
            onClick={ (e) => this.checkAnswer(e, timer, results[index].difficulty) }
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
  name: state.login.user,
  email: state.login.email,
});

const mapDispatchToProps = (dispatch) => ({
  setPointsRedux: (points) => dispatch(getPlacar(points)),
});

Question.propTypes = {
  results: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.array, PropTypes.func]))
    .isRequired,
  setPointsRedux: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
