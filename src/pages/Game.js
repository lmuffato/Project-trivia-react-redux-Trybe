import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import Header from '../components/Header';
import {
  calculateScore,
  fetchAPIThunk,
  timeOut,
  timeIn,
  addAssertions as sumAssertions,
} from '../actions/index';
import Timer from '../components/Timer';
import RenderAnswers from '../components/RenderAnswers';
import { getItemFromLocalStorage, setToLocalStorage } from '../services/storage';
import Alert from '../components/Alert';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questionNumber: 0,
      changedQuestion: false,
      shouldRedirect: false,
    };
    this.checkAnswer = this.checkAnswer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.resetChangedQuestion = this.resetChangedQuestion.bind(this);
    this.reset = this.reset.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
  }

  componentDidMount() {
    const { fetchAPI } = this.props;
    const category = getItemFromLocalStorage('category');
    const difficulty = getItemFromLocalStorage('difficulty');
    const type = getItemFromLocalStorage('type');
    fetchAPI(category, difficulty, type);
  }

  componentWillUnmount() {
    const { next } = this.props;
    next();
    this.reset();
  }

  reset() {
    this.setState({
      questionNumber: 0,
      changedQuestion: false,
      shouldRedirect: false,
    });
  }

  nextQuestion() {
    const { apiResult: { results }, next } = this.props;
    const { questionNumber } = this.state;
    if (results.length - 1 === questionNumber) {
      this.setState(({ shouldRedirect: true }));
      return;
    }
    this.setState({
      questionNumber: questionNumber + 1,
      changedQuestion: true,
    });
    next();
  }

  resetChangedQuestion() {
    this.setState({ changedQuestion: false });
  }

  checkLogin() {
    const { player: { isLogged } } = this.props;
    return isLogged;
  }

  checkAnswer(event, questionLevel) {
    const { addScore, timesUp, addAssertions } = this.props;
    const DEFAULT_POINTS = 10;
    const getTime = Number(document.getElementById('timer').innerHTML);
    const attribute = event.target.getAttribute('data-testid');
    const state = getItemFromLocalStorage('state');
    if (attribute !== 'correct-answer') return timesUp();
    const points = DEFAULT_POINTS + (getTime * questionLevel);
    state.player.score += points;
    state.player.assertions += 1;
    setToLocalStorage('state', state);
    addAssertions();
    timesUp();
    return addScore(points);
  }

  render() {
    const { isLoading, questionAnswered } = this.props;
    const { questionNumber, shouldRedirect, changedQuestion } = this.state;
    if (isLoading) return <h2>Loading...</h2>;
    if (shouldRedirect) return <Redirect to="/feedback" />;
    if (!this.checkLogin()) {
      return (
        <Alert>
          <h1>Você precisa estar logado para jogar!</h1>
        </Alert>
      );
    }
    return (
      <div>
        <Header />
        <span>
          Tempo:
          <Timer
            changedQuestion={ changedQuestion }
            resetChangedQuestion={ this.resetChangedQuestion }
          />
          segundos
        </span>
        <RenderAnswers
          checkAnswer={ this.checkAnswer }
          question={ questionNumber }
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
  fetchAPI: (cat, df, tp) => dispatch(fetchAPIThunk(cat, df, tp)),
  timesUp: () => dispatch(timeOut()),
  addScore: (score) => dispatch(calculateScore(score)),
  next: () => dispatch(timeIn()),
  addAssertions: () => dispatch(sumAssertions()),
});

const mapStateToProps = ({ apiResponse: { isLoading, apiResult }, player }) => ({
  isLoading,
  player,
  questionAnswered: player.timeOut,
  apiResult,
});

Game.propTypes = {
  fetchAPI: Proptypes.func,
  isLoading: Proptypes.bool,
  timesUp: Proptypes.func,
  addScore: Proptypes.func,
  stateCategory: Proptypes.string,
  stateDificulte: Proptypes.string,
  stateType: Proptypes.string,
  next: Proptypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
