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
    const { ranking } = this.props;
    this.feedbackMessage();
    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  feedbackMessage() {
    const score = localStorage.getItem('state');
    const results = JSON.parse(score);
    const { assertions } = results.player;
    this.setState({ assertions });
  }

  render() {
    const urlSuccess = <img src="https://media.giphy.com/media/yoJC2GnSClbPOkV0eA/giphy.gif" alt="Success!" className="success" />;
    const urlFail = <img src="https://media.giphy.com/media/fxZeSkds6bcWGlgevx/source.gif" alt="Fail!" className="fail" />;
    const { score } = this.props;
    const maxAssertions = 2;
    const { assertions, ranking, loginRedirect } = this.state;
    return (
      <div>
        <header>
          <Header />
          <h1 data-testid="feedback-text" className="textFeed">
            {assertions <= maxAssertions ? 'Podia ser melhor...' : 'Mandou bem!'}
          </h1>
          {assertions <= maxAssertions ? urlFail : urlSuccess}
          <h2>Sua Pontuação: </h2>
          <h4 data-testid="feedback-total-score">
            {score}
          </h4>
          <h2>Respostas corretas: </h2>
          <h4 data-testid="feedback-total-question">
            {assertions}
          </h4>
        </header>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => this.setState({ loginRedirect: true }) }
          className="btn btn-success"
        >
          Jogar novamente
        </button>
        {loginRedirect && <Redirect to="/" />}
        <button
          data-testid="btn-ranking"
          onClick={ () => this.setState({ ranking: true }) }
          type="button"
          className="btn btn-danger"
        >
          Ver Ranking
        </button>
        {ranking && <Redirect to="/ranking" /> }
      </div>);
  }
}

const mapStateToProps = (state) => ({
  score: state.game.placar,
  ranking: state.game.users,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  ranking: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Feedback);
