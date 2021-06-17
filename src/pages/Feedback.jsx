import React, { Component } from 'react';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    return (
      <div>
        <h2 data-testid="feedback-text">Feedback</h2>
        <Header />
      </div>
    );
  }
}

export default Feedback;
