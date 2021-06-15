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
    };

    this.fetchApi = this.fetchApi.bind(this);
  }

  componentDidMount() {
    this.fetchApi();
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
    const { questions, currentQuestionId, isLoading } = this.state;
    const currentQuestion = questions[currentQuestionId];

    if (isLoading) return (<p>Loading...</p>);

    return (
      <>
        <p>Questão:</p>
        {(currentQuestion) && <Question currQuestion={ currentQuestion } />}

        <Header />
        <p>Jogo</p>
      </>
    );
  }
}

export default Game;
