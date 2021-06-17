import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import Question from '../components/Question';
import getTriviaQuestions from '../utils/triviaApi';
import Header from '../components/Header';
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
      },
    }));
  }

  handleNextButton() {
    const { currentQuestionId } = this.state;
    const maxQuestions = 4;

    if (currentQuestionId === maxQuestions) {
      return (
        <Redirect to="/feedback" />
      );
    }
    this.setState(({ currentQuestionId }) => ({
      currentQuestionId: currentQuestionId + 1,
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
        <Header score={ score } />
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
          />}

        <Header />
        <p>Jogo</p>
      </>
    );
  }
}

export default Game;
