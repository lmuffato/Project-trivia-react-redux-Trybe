import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import QuestCard from '../components/QuestCard';
import Timer from '../components/Timer';

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
  }

  getUserAnswer(response) {
    const { answer, time } = this.state;
    answer.push({ ...response, time });
    this.setState({ answer, answered: true });
  }

  stopTimer(interval, time) {
    const { answered } = this.state;
    if (answered) {
      clearInterval(interval);
      this.setState({ time });
    }
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

GameScreen.propTypes = {
  questions: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.object)]).isRequired,
  time: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(GameScreen);
