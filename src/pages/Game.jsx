import React, { Component } from 'react';

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
      timer: 10,
    };

    this.handleClick = this.handleClick.bind(this);
    this.fetchApi = this.fetchApi.bind(this);
  }

  componentDidMount() {
    this.fetchApi();
  }

  componentDidUpdate() {
    const { player } = this.state;
    updateLocalStorage('state', { player });
  }

  handleClick(difficulty) {
    const { timer } = this.state;
    this.setState(({ player }) => ({
      player: {
        ...player,
        score: player.score + updateUserScore(timer, difficulty),
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
      },
    );
  }

  render() {
    const {
      questions,
      currentQuestionId,
      isLoading,
      timer,
      player: { score },
    } = this.state;
    const currentQuestion = questions[currentQuestionId];

    if (isLoading) return (<p>Loading...</p>);

    return (
      <>
        <Header score={ score } />
        <p>Questão:</p>
        {(currentQuestion) && (
          <Question
            timer={ timer }
            currQuestion={ currentQuestion }
            handleClick={ this.handleClick }
          />)}
      </>
    );
  }
}

export default Game;
