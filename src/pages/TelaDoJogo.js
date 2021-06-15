import React, { Component } from 'react';
import { getQuestions } from '../services/api';
import Header from '../components/Header';

class TelaDoJogo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      finishRequest: false,
    };

    this.updateState = this.updateState.bind(this);
  }

  async componentDidMount() {
    const response = await getQuestions();
    this.updateState(response);
  }

  updateState(response) {
    this.setState({
      results: response,
    }, () => this.setState({
      finishRequest: true,
    }));
  }

  render() {
    const { results, finishRequest } = this.state;
    return (
      <div>
        <Header />
        {finishRequest && results
          .map(({ category, question, correct_answer, incorrect_answers }) => {
            const allAnsewers = [...incorrect_answers, correct_answer];
            return (
              <div>
                <p data-testid="question-category">{category}</p>
                <p data-testid="question-text">{question}</p>
                { allAnsewers.map((answers) => <p>{answers}</p>)}
              </div>
            );
          })}

      </div>
    );
  }
}

export default TelaDoJogo;
