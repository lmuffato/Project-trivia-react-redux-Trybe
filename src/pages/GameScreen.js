import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import QuestCard from '../components/QuestCard';
import Timer from '../components/Timer';
import { updateScoreAction } from '../redux/actions';

class GameScreen extends React.Component {
  constructor(props) {
    super(props);
    const { time } = this.props;
    this.state = {
      answer: [],
      time,
      answered: false,
    };
    this.loading = this.loading.bind(this);
    this.getUserAnswer = this.getUserAnswer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.updateUserScore = this.updateUserScore.bind(this);
    this.calcDifficulty = this.calcDifficulty.bind(this);
  }

  getUserAnswer(response) { // {validation: "correct-answer", Questiondifficulty: "medium"}
    const { answer, time } = this.state;
    const { validation, questionDifficulty } = response;
    this.updateUserScore(validation, questionDifficulty, time);
    answer.push({ ...response, time });
    this.setState({ answer, answered: true });
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
    if (validation === 'correct-answer') {
      const calcScore = basePoints + (time * difficulty);
      updateScore(calcScore, updateAssertions);
    }
  }

  stopTimer(interval, time) {
    const { answered } = this.state;
    if (answered) {
      this.setState({ time });
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
    const { questions, time } = this.props;
    const { answered } = this.state;
    return (
      <>
        <Header />
        <Timer time={ time } stopTimer={ this.stopTimer } answered={ answered } />
        <section>
          { questions === '' ? this.loading() : <QuestCard
            question={ questions[0] }
            getUserAnswer={ this.getUserAnswer }
          /> }
        </section>
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
