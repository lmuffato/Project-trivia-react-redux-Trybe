import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import Header from '../components/Header';
import { calculateScore, fetchAPIThunk, timeOut } from '../actions/index';
import Timer from '../components/Timer';
import RenderQuestions from '../components/RenderQuestions';
import { getItemFromLocalStorage, setToLocalStorage } from '../services/storage';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questionNumber: 0,
      // questionAnswered: false,
    };
    this.checkAnswer = this.checkAnswer.bind(this);
  }

  componentDidMount() {
    const { fetchAPI } = this.props;
    fetchAPI();
  }

  checkAnswer(event, questionLevel) {
    const { addScore, timesUp } = this.props;
    const DEFAULT_POINTS = 10;
    const getTime = Number(document.getElementById('timer').innerHTML);
    const attribute = event.target.getAttribute('data-testid');
    const state = getItemFromLocalStorage('state');
    if (attribute !== 'correct-answer') return timesUp();
    const points = DEFAULT_POINTS + (getTime * questionLevel);
    state.player.score = points;
    setToLocalStorage('state', state);
    timesUp();
    return addScore(points);
  }

  render() {
    const { isLoading } = this.props;
    const { questionNumber } = this.state;
    if (isLoading) return <h2>Loading...</h2>;
    return (
      <div>
        <Header />
        <span>
          Tempo:
          <Timer />
          segundos
        </span>
        <RenderQuestions
          checkAnswer={ this.checkAnswer }
          question={ questionNumber }
        />
        <button type="button">PRÓXIMA</button>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  fetchAPI: () => dispatch(fetchAPIThunk()),
  timesUp: () => dispatch(timeOut()),
  addScore: (score) => dispatch(calculateScore(score)),
});

const mapStateToProps = ({ apiResponse: { isLoading } }) => ({
  isLoading,
});

Game.propTypes = {
  fetchAPI: Proptypes.func,
  isLoading: Proptypes.bool,
  timesUp: Proptypes.func,
  addScore: Proptypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
