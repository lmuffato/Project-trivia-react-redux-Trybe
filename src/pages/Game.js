import React from 'react';
import { getApiQuestions } from '../services/api';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: '',
    };
  }

  componentDidMount() {
    getApiQuestions()
      .then((questions) => this.setState({ questions }));
  }

  render() {
    const { questions } = this.state;
    const { results } = questions;
    console.log(results);
    return (
      <div>

        <h1>pagina game</h1>
      </div>
    );
  }
}
export default Game;
