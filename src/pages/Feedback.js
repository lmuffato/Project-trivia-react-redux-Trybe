import React from 'react';
import Header from '../components/Header';

class FeedBack extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">test</p>
      </div>
    );
  }
}

export default FeedBack;
