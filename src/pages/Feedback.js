import React from 'react';

class Feedback extends React.Component {
  render() {
    const { assertions } = localStorage.getItem('player');
    const goodAssertions = 3;
    return (
      <div>
        {
          parseFloat(assertions) < goodAssertions
            ? <p data-testid="feedback-text">Podia ser melhor...</p>
            : <p data-testid="feedback-text">Mandou bem!</p>
        }
      </div>
    );
  }
}

export default Feedback;
