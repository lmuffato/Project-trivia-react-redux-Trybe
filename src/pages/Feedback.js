import React, { Component } from 'react';
import Header from '../components/Header';

class App extends Component {
  render() {
    const score = 2;
    const minScore = 3;
    return (
      <>
        <Header />
        <section>
          {(score < minScore)
            ? <span data-testid="feedback-text"> Podia ser melhor... </span>
            : <span data-testid="feedback-text"> Mandou bem! </span> }
        </section>
      </>
    );
  }
}

export default App;
