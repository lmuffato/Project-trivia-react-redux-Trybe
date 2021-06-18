import React, { Component } from 'react';
import { connect } from 'react-redux';
import { objectOf, string, number, oneOfType } from 'prop-types';
import Header from '../components/Header';
import '../styles/feedBack.css';

class FeedBack extends Component {
  constructor(props) {
    super(props);

    this.result = this.result.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.performance = this.performance.bind(this);
    this.setLocalStorage = this.setLocalStorage.bind(this);
  }

  componentDidMount() {
    this.setLocalStorage();
  }

  setLocalStorage() {
    const { player } = this.props;
    const { name, score } = player;
    const rankingStorage = {
      name,
      score,
    };
    const players = JSON.parse(localStorage.getItem('ranking') || '[]');
    players.push(rankingStorage);
    localStorage.setItem('ranking', JSON.stringify(players));
    // localStorage.setItem('ranking', JSON.stringify(rankingStorage));
  }

  result() {
    const { player: { assertions } } = this.props;
    const questionsCount = 3;
    if (assertions >= questionsCount) {
      return <p data-testid="feedback-text"><strong>Mandou bem!</strong></p>;
    }
    return <p data-testid="feedback-text"><strong>Podia ser melhor...</strong></p>;
  }

  performance() {
    const { player: { assertions, score } } = this.props;
    console.log(assertions);
    return (
      <div className="percent-content">
        <p>
          <strong>
            Você acertou um total de &nbsp;
            <span data-testid="feedback-total-question">{assertions}</span>
            &nbsp;
            { assertions <= 1 ? 'pergunta!' : 'perguntas!' }
          </strong>
        </p>
        <p>
          <strong>
            Você obteve &nbsp;
            <span data-testid="feedback-total-score">{score}</span>
            &nbsp; pontos!
          </strong>
        </p>
      </div>
    );
  }

  handleClick({ target }) {
    const { history } = this.props;
    if (target.innerText === 'Jogar Novamente') {
      history.push('/');
    } else {
      history.push('/ranking');
    }
  }

  render() {
    return (
      <div className="header-feedback">
        <Header />
        <div className="results-content">
          { this.result() }
          { this.performance() }
        </div>
        <button
          type="button"
          data-testid="btn-play-again"
          className="again-button"
          name="login"
          onClick={ this.handleClick }
        >
          <strong>
            Jogar Novamente
          </strong>
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          className="again-button"
          name="ranking"
          onClick={ this.handleClick }
        >
          <strong>
            Ver Ranking
          </strong>
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

FeedBack.propTypes = {
  player: objectOf(oneOfType([string, number])),
}.isRequired;

export default connect(mapStateToProps)(FeedBack);
