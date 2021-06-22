import React, { Component } from 'react';

const THREE = 3;

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      feedback: '',
      scoreTotal: 0,
      assertionsTotal: 0,
    };
    this.setTextFeedBack = this.setTextFeedBack.bind(this);
  }

  componentDidMount() {
    this.setTextFeedBack();
  }

  setTextFeedBack() {
    const state = JSON.parse(localStorage.getItem('state')).player;
    const { assertions, score } = state;
    if (assertions < THREE) {
      this.setState({ feedback: 'Podia ser melhor...' });
    } else if (assertions >= THREE) {
      this.setState({ feedback: 'Mandou bem!' });
    }
    this.setState({ scoreTotal: score, assertionsTotal: assertions });
  }

  render() {
    const { feedback, scoreTotal, assertionsTotal } = this.state;
    return (
      <>
        <h1>Feedback</h1>
        <h3 data-testid="feedback-text">{ feedback }</h3>
        <h3 data-testid="feedback-total-score">{ scoreTotal }</h3>
        <h3 data-testid="feedback-total-question">
          { assertionsTotal === 0 ? 'Não acertou nenhuma pergunta' : assertionsTotal }
        </h3>
      </>
    );
  }
}

export default Feedback;
