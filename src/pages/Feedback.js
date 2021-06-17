import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/gameHeader';

class Feedback extends React.Component {
  constructor() {
    super();

    this.feedbackMessage = this.feedbackMessage.bind(this);
    this.getAssertions = this.getAssertions.bind(this);
  }

  getAssertions() {
    const score = localStorage.getItem('state');
    const results = JSON.parse(score);
    const { assertions } = results.player;
    return assertions;
  }

  feedbackMessage() {
    const score = localStorage.getItem('state');
    const results = JSON.parse(score);
    const { assertions } = results.player;
    const maxAssertions = 3;
    if (assertions < maxAssertions) {
      return <h1 data-textid="feedback-text">Podia ser melhor...</h1>;
    }
    return <h1 data-textid="feedback-text">Mandou bem!</h1>;
  }

  render() {
    const { score } = this.props;
    return (
      <header>
        <Header />
        {this.feedbackMessage()}
        <h3 data-textid="feedback-total-score">
          Pontuação Total:
          {' '}
          {score}
          {' '}
        </h3>
        <h3 data-textid="feedback-total-question">
          Total de Acertos:
          {' '}
          {this.getAssertions()}
        </h3>
      </header>);
  }
}

const mapStateToProps = (state) => ({
  score: state.game.placar,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
