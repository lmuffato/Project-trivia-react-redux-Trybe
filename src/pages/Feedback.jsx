import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  constructor() {
    super();

    this.assertion = this.assertion.bind(this);
  }

  assertion() {
    const { player: { assertions } } = this.props;
    const n = 3;
    if (assertions > n) {
      return 'Parabéns';
    }
    if (assertions > 1 && assertions <= n) {
      return 'Bom, mas pode ser melhor!';
    }
    return 'Não foi satisfatório';
  }

  render() {
    const { player: { score } } = this.props;
    return (
      <>
        <Header />
        <h1> Feedback </h1>
        <div>{ score }</div>
        <div>{ this.assertion }</div>
        <form action="/">
          <button
            type="submit"
            data-testid="btn-play-again"
          >
            Jogar novamente
          </button>
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

Feedback.propTypes = {
  player: PropTypes.shape({
    score: PropTypes.number,
    assertions: PropTypes.number,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
