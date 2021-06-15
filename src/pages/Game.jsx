import React, { Component } from 'react';

import Question from '../components/Question';
import getTriviaQuestions from '../utils/triviaApi';
import Header from '../components/Header';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      currentQuestionId: 0,
      isLoading: false,
      timeLeft: 30,
    };

    this.timer = 0;

    this.fetchApi = this.fetchApi.bind(this);
    this.countDown = this.countDown.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }

  componentDidMount() {
    this.fetchApi();
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
    const { questions, currentQuestionId, isLoading, timeLeft } = this.state;
    const currentQuestion = questions[currentQuestionId];

    if (isLoading) return (<p>Loading...</p>);

    return (
      <>
        <p>Questão:</p>
        {(currentQuestion)
          && <Question
            stopTimer={ this.stopTimer }
            currQuestion={ currentQuestion }
            timeLeft={ timeLeft }
          />}

        <Header />
        <p>Jogo</p>
      </>
    );
  }
}

export default Game;
