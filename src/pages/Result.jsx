import React, { Component } from 'react';
import Header from '../components/Header';

class Result extends Component {
  render() {
    return (
      <div data-testid="feedback-text">
        <Header />
        Result
      </div>
    );
  }
}

export default Result;
