import React, { Component } from 'react';
import './trueOrfalse.css';

class TrueOrFalse extends Component {
  render() {
    return (
      <main className="main-container">
        <section className="question-container">
          <h2>Categoria da Pergunta</h2>
          <p>Pergunta</p>
          <p>Tempo</p>
        </section>
        <section className="answers-container">
          <button type="button">True</button>
          <button type="button">False</button>
          <button id="next" type="button">Próxima</button>
        </section>
      </main>
    );
  }
}

export default TrueOrFalse;
