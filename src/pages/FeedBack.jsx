import React, { Component } from 'react';
import { connect } from 'react-redux';
import { objectOf, string, number, oneOfType } from 'prop-types';
import Header from '../components/Header';

class FeedBack extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionsCount: 3,
    };

    this.result = this.result.bind(this);
    this.performance = this.performance.bind(this);
  }

  result() {
    const { player: { assertions } } = this.props;
    const { questionsCount } = this.state;
    if (assertions < questionsCount) {
      return <p data-testid="feedback-text">Podia ser melhor...</p>;
    }
    return <p data-testid="feedback-text">Mandou bem!</p>;
  }

  performance() {
    const { player: { assertions, score } } = this.props;
    return (
      <div>
        <p>
          Você acertou um total de &nbsp;
          <span data-testid="feedback-total-question">{assertions}</span>
          &nbsp; perguntas!
        </p>
        <p>
          Você obteve &nbsp;
          <span data-testid="feedback-total-score">{score}</span>
          &nbsp; pontos!
        </p>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Header />
        { this.result() }
        { this.performance() }
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
