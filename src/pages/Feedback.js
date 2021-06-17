import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/gameHeader';

class Feedback extends React.Component {
  constructor() {
    super();
    this.state = {
      assertions: 0,
      loginRedirect: false,
      ranking: false,
    };

    this.feedbackMessage = this.feedbackMessage.bind(this);
  }

  componentDidMount() {
    this.feedbackMessage();
  }

  feedbackMessage() {
    const score = localStorage.getItem('state');
    const results = JSON.parse(score);
    const { assertions } = results.player;
    this.setState({ assertions });
  }

  render() {
    const { score } = this.props;
    const maxAssertions = 3;
    const { assertions, ranking, loginRedirect } = this.state;
    return (
      <div>
        <header>
          <Header />
          <h1 data-testid="feedback-text">
            {assertions < maxAssertions ? 'Podia ser melhor...' : 'Mandou bem!'}
          </h1>
          <h3 data-testid="feedback-total-score">
            Pontuação Total:
            {' '}
            {score}
            {' '}
          </h3>
          <h3 data-testid="feedback-total-question">
            Total de Acertos:
            {' '}
            {assertions}
          </h3>
        </header>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => this.setState({ loginRedirect: true }) }
        >
          Jogar novamente
        </button>
        {loginRedirect && <Redirect to="/" />}
        <button
          data-testid="btn-ranking"
          onClick={ () => this.setState({ ranking: true }) }
          type="button"
        >
          Ver Ranking
        </button>
        {ranking && <Redirect to="/ranking" /> }
      </div>);
  }
}

const mapStateToProps = (state) => ({
  score: state.game.placar,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
