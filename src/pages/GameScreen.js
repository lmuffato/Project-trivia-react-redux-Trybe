import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import QuestCard from '../components/QuestCard';
import { updateScoreAction } from '../redux/actions';

class GameScreen extends React.Component {
  constructor(props) {
    super(props);
    const { time } = this.props;
    this.state = {
      answer: [],
      time,
      answered: false,
      actualQuestion: 0,
      toFeedback: () => null,
    };
    this.loading = this.loading.bind(this);
    this.getUserAnswer = this.getUserAnswer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.updateUserScore = this.updateUserScore.bind(this);
    this.calcDifficulty = this.calcDifficulty.bind(this);
    this.onNextClick = this.onNextClick.bind(this);
    this.runTimer = this.runTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  componentDidMount() {
    const { time } = this.state;
    this.runTimer(time);
  }

  onNextClick() {
    let { actualQuestion } = this.state;
    const { questions } = this.props;
    if (actualQuestion < questions.length - 1) {
      actualQuestion += 1;
      this.setState({ actualQuestion });
      this.resetTimer();
    } else {
      this.setState({ toFeedback: () => <Redirect to="/feedback" /> });
    }
  }

  getUserAnswer(response) { // {validation: "correct-answer", Questiondifficulty: "medium"}
    const { answer, time } = this.state;
    const { validation, questionDifficulty } = response;
    this.updateUserScore(validation, questionDifficulty, time);
    answer.push({ ...response, time });
    this.setState({ answer, answered: true });
  }

  runTimer(time) {
    const oneSec = 1000;
    const interval = setInterval(() => {
      if (time > 0) {
        time -= 1;
      } else {
        clearInterval(interval);
        const buttons = document.querySelectorAll('button');
        buttons.forEach((button) => { button.disabled = true; });
      }
      this.setState({ time });
      this.stopTimer(interval, time);
    }, oneSec);
  }

  resetTimer() {
    const { time } = this.props;
    this.setState({ time, answered: false });
    this.runTimer(time);
  }

  calcDifficulty(difficulty) {
    switch (difficulty) {
    case 'easy': return 1;
    case 'medium': return 2;
    default: return 2;
    }
  }

  updateUserScore(validation, questionDifficulty, time) {
    const { updateScore } = this.props;
    const basePoints = 10;
    const updateAssertions = 1;
    const difficulty = this.calcDifficulty(questionDifficulty);
    if (validation === 'correct correct-answer') {
      const calcScore = basePoints + (time * difficulty);
      updateScore(calcScore, updateAssertions);
    }
  }

  stopTimer(interval, time) {
    const { answered } = this.state;
    if (answered) {
      clearInterval(interval);
    }
    this.setState({
      time,
    });
  }

  loading() {
    return <h1> Loading </h1>;
  }

  render() {
    const { questions } = this.props;
    const { actualQuestion, toFeedback, time } = this.state;
    return (
      <>
        <Header />
        <h1>{ time }</h1>
        <section>
          { questions === '' ? this.loading() : <QuestCard
            question={ questions[actualQuestion] }
            getUserAnswer={ this.getUserAnswer }
            nextQuestion={ this.onNextClick }
          /> }
        </section>
        { toFeedback() }
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.login.questions,
  time: state.configs.time,
});

const mapDispatchToProps = (dispatch) => ({
  updateScore: (score, updateAssertions) => dispatch(
    updateScoreAction(score, updateAssertions),
  ),
});

GameScreen.propTypes = {
  questions: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.object)]).isRequired,
  time: PropTypes.number.isRequired,
  updateScore: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
