import React, { Component } from 'react';
import { string, shape } from 'prop-types';
import { connect } from 'react-redux';

import md5 from 'crypto-js/md5';

import Question from '../components/Question';
import getTriviaQuestions from '../utils/triviaApi';
import { updateLocalStorage, updateUserScore } from '../utils/functions';

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
    };

    this.timer = 0;

    this.handleClick = this.handleClick.bind(this);
    this.fetchApi = this.fetchApi.bind(this);
    this.countDown = this.countDown.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
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
  }

  handleClick(difficulty) {
    const { timeLeft } = this.state;
    this.setState(({ player }) => ({
      player: {
        ...player,
        score: player.score + updateUserScore(timeLeft, difficulty),
      },
    }));
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
      picture: player.email,
    };
    const newRank = localStorage.getItem('ranking')
      ? [...JSON.parse(localStorage.getItem('ranking')), newPlayer]
      : [newPlayer];
    localStorage.setItem('ranking', JSON.stringify(newRank));
  }

  render() {
    const { player: { gravatarEmail, name } } = this.state;
    const {
      questions,
      currentQuestionId,
      isLoading,
      timeLeft,
      player: { score },
    } = this.state;
    const currentQuestion = questions[currentQuestionId];

    if (isLoading) return (<p>Loading...</p>);

    return (
      <>
        <header>
          <img
            src={ gravatarEmail }
            alt="Gravatar"
            data-testid="header-profile-picture"
          />
          <p data-testid="header-player-name">{`Jogador ${name}`}</p>
          <p data-testid="header-score">{ score }</p>
        </header>
        <p>Questão:</p>
        {(currentQuestion)
          && <Question
            saveRanking={ this.saveRanking }
            stopTimer={ this.stopTimer }
            currQuestion={ currentQuestion }
            timeLeft={ timeLeft }
            handleClick={ this.handleClick }
          />}
        <p>Jogo</p>
      </>
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
