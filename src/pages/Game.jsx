import React, { Component } from 'react';
import { string, shape } from 'prop-types';
import { connect } from 'react-redux';

import md5 from 'crypto-js/md5';

import { Redirect } from 'react-router-dom';
import Question from '../components/Question';
import getTriviaQuestions from '../utils/triviaApi';
import { updateLocalStorage, updateUserScore } from '../utils/functions';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      player: {
        name: '',
        assertions: 0,
        score: 0,
        gravatarEmail: '',
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

  render() {
    const { user } = this.props;
    const { name, email } = user;
    const hash = md5(email).toString();
    const {
      questions,
      currentQuestionId,
      shouldRedirect,
      isLoading,
      timeLeft,
      player: { score },
    } = this.state;
    const currentQuestion = questions[currentQuestionId];

    if (isLoading) return (<p>Loading...</p>);

    if (shouldRedirect) return <Redirect to="/feedback" />;

    return (
      <>
        <header>
          <img src={ `https://www.gravatar.com/avatar/${hash}.png` } alt="Gravatar" data-testid="header-profile-picture" />
          <p data-testid="header-player-name">{`Jogador ${name}`}</p>
          <p data-testid="header-score">{ score }</p>
        </header>
        <p>
          tempo:
          { timeLeft }
        </p>
        <p>Questão:</p>
        {(currentQuestion)
          && <Question
            stopTimer={ this.stopTimer }
            currQuestion={ currentQuestion }
            timeLeft={ timeLeft }
            handleClick={ this.handleClick }
            clickNextButton={ this.handleNextButton }
            currQuestionId={ currentQuestionId }
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
