import React, { Component } from 'react';
import { string, shape } from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { Redirect } from 'react-router-dom';

import logo from '../trivia.png';
import Question from '../components/Question';
import getTriviaQuestions from '../utils/triviaApi';
import { updateLocalStorage, updateUserScore } from '../utils/functions';

import '../styles/game.css';

class Game extends Component {
  constructor(props) {
    super(props);
    const { user } = props;
    const hash = md5(user.email).toString();
    this.state = {
      player: {
        name: user.name,
        assertions: 0,
        score: 0,
        gravatarEmail: `https://www.gravatar.com/avatar/${hash}.png`,
      },
      questions: [],
      currentQuestionId: 0,
      isLoading: false,
      timeLeft: 30,
      shouldRedirect: false,
    };

    this.timer = 0;

    this.handleNextButton = this.handleNextButton.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.fetchApi = this.fetchApi.bind(this);
    this.countDown = this.countDown.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
  }

  componentDidMount() {
    this.fetchApi();
  }

  componentDidUpdate() {
    const { player } = this.state;
    updateLocalStorage('state', { player });
  }

  startTimer() {
    const oneSecond = 1000;
    if (this.timer === 0) {
      this.timer = setInterval(this.countDown, oneSecond);
    }
  }

  countDown() {
    const { timeLeft } = this.state;

    if (timeLeft === 0) {
      clearInterval(this.timer);
      this.setState({
        timeLeft: 0,
      });
      return;
    }

    this.setState((prevState) => ({
      timeLeft: prevState.timeLeft - 1,
    }));
  }

  stopTimer() {
    clearInterval(this.timer);
    this.timer = 0;
  }

  handleClick(difficulty) {
    const { timeLeft } = this.state;
    this.setState(({ player }) => ({
      player: {
        ...player,
        score: player.score + updateUserScore(timeLeft, difficulty),
        assertions: player.assertions + 1,
      },
    }));
  }

  handleNextButton() {
    const { currentQuestionId } = this.state;
    const maxQuestions = 4;

    if (currentQuestionId >= maxQuestions) {
      this.setState({
        shouldRedirect: true,
      });
      this.saveRanking();
    }
    this.setState((prevState) => ({
      currentQuestionId: prevState.currentQuestionId + 1,
      timeLeft: 30,
    }));
    this.startTimer();
  }

  fetchApi() {
    this.setState(
      { isLoading: true },
      async () => {
        const { results } = await getTriviaQuestions();
        this.setState({
          questions: results,
          isLoading: false,
        });
        this.startTimer();
      },
    );
  }

  saveRanking() {
    const { player } = this.state;
    const newPlayer = {
      name: player.name,
      score: player.score,
      picture: player.gravatarEmail,
    };
    const newRank = localStorage.getItem('ranking')
      ? [...JSON.parse(localStorage.getItem('ranking')), newPlayer]
      : [newPlayer];
    localStorage.setItem('ranking', JSON.stringify(newRank));
  }

  renderHeader() {
    const { user: { name, email } } = this.props;
    const { player: { gravatarEmail, score } } = this.state;

    return (
      <header className="header-game">
        <div className="content-player">
          <img
            className="gravatar-img-game"
            src={ gravatarEmail }
            alt="Gravatar"
            data-testid="header-profile-picture"
          />
          <div className="content-group-player">
            <p className="player-name" data-testid="header-player-name">{name}</p>
            <p className="player-email">{email}</p>
          </div>
        </div>
        <div>
          <img width="150" src={ logo } alt="Logo" />
        </div>
        <div className="content-score-assertions">
          <p className="score-player" data-testid="header-score">
            { score === 0 ? '00' : score }
          </p>
        </div>
      </header>
    );
  }

  render() {
    const {
      questions,
      currentQuestionId,
      shouldRedirect,
      isLoading,
      timeLeft,
    } = this.state;
    const currentQuestion = questions[currentQuestionId];

    if (isLoading) return (<p>Loading...</p>);

    if (shouldRedirect) return <Redirect to="/feedback" />;

    return (
      <section className="content-game">
        {this.renderHeader()}

        <div className="content-timer">
          <p className="time-display">
            { timeLeft }
          </p>
        </div>
        {(currentQuestion)
          && <Question
            saveRanking={ this.saveRanking }
            stopTimer={ this.stopTimer }
            currQuestion={ currentQuestion }
            timeLeft={ timeLeft }
            handleClick={ this.handleClick }
            clickNextButton={ this.handleNextButton }
            currQuestionId={ currentQuestionId }
          />}
        <p>Jogo</p>
      </section>
    );
  }
}

Game.propTypes = {
  user: shape({
    name: string,
    email: string,
  }).isRequired,
};

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps)(Game);
