import React, { Component } from 'react';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    return (
      <div>
        <p data-testid="feedback-text">Feedback</p>
        <Header />
      </div>
    );
  }
}

export default Feedback;
