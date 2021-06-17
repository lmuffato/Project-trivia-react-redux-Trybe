import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import Header from '../components/Header';
import { fetchAPIThunk, timeIn } from '../actions/index';
import Timer from '../components/Timer';
import RenderQuestions from '../components/RenderQuestions';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questionNumber: 0,
      questionAnswered: false,
      changedQuestion: false,
      // score: 0,
    };
    this.nextQuestion = this.nextQuestion.bind(this);
    this.upadateStateAnsered = this.upadateStateAnsered.bind(this);
    this.resetStatusChangedQuestion = this.resetStatusChangedQuestion.bind(this);
  }

  componentDidMount() {
    const { fetchAPI } = this.props;
    fetchAPI();
  }

  upadateStateAnsered() {
    this.setState({
      questionAnswered: true,
    });
  }

  nextQuestion() {
    const { currentTime } = this.props;
    this.setState(({ questionNumber }) => ({
      questionNumber: questionNumber + 1,
      questionAnswered: false,
      changedQuestion: true,
    }));
    currentTime();
  }

  resetStatusChangedQuestion() {
    this.setState({
      changedQuestion: false,
    });
  }

  render() {
    const { isLoading } = this.props;
    const { questionNumber, questionAnswered, changedQuestion } = this.state;
    if (isLoading) return <h2>Loading...</h2>;
    return (
      <div>
        <Header />
        <span>
          Tempo:
          <Timer
            changeStateAnsered={ this.upadateStateAnsered }
            questionAnswered={ questionAnswered }
            changedQuestion={ changedQuestion }
            resetStatusChangedQuestion={ this.resetStatusChangedQuestion }
          />
          segundos
        </span>
        <RenderQuestions
          question={ questionNumber }
          changeStateAnsered={ this.upadateStateAnsered }
          questionAnswered={ questionAnswered }
        />
        {questionAnswered
          ? (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ this.nextQuestion }
            >
              PRÓXIMA
            </button>) : ''}
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  currentTime: () => dispatch(timeIn()),
  fetchAPI: () => dispatch(fetchAPIThunk()),
});

const mapStateToProps = ({ player: { timeOut }, apiResponse: { isLoading } }) => ({
  timeOut,
  isLoading,
});

Game.propTypes = {
  fetchAPI: Proptypes.func.isRequired,
  isLoading: Proptypes.bool.isRequired,
  currentTime: Proptypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
