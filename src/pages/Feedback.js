import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        <Link to="/ranking">
          <button type="button" data-test-id="btn-ranking">Ranking</button>
        </Link>
      </>
    );
  }
}

export default App;
