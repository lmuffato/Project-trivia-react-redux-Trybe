import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Feedback extends Component {
  render() {
      const { correctAnwsers, score } = this.props;
      let feedback = 0;
      if (correctAnwsers >= 3) {
        feedback = "Mandou bem!"
      } feedback = "Podia ser melhor..."
    return (
      <div>
        <h2 data-testid="feedback-text">{ feedback }</h2>
        <h3 data-testid="feedback-total-question">`Você acertou ${correctAnwsers} questões!`</h3>
        <h3 data-testid="feedback-total-score">`Um total de ${score} pontos`</h3>
        <Link to="/" data-testid="btn-play-again">
        Jogar novamente
        </Link>
        <Link to="/ranking" data-testid="btn-ranking">
        Ver Ranking
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    score: state.user.score;
    correctAnwsers: state.user.correctAnwsers;
}

export default connect (null, mapStateToProps)(Feedback);
