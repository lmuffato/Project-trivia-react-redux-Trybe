import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Badge from '../components/badge/Badge';
import Button from '../components/button/Button';

class Feedback extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToLogin: false,
      redirectToRanking: false,
    };

    this.getAssertion = this.getAssertion.bind(this);
    this.redirectToLogin = this.redirectToLogin.bind(this);
    this.redirectToRanking = this.redirectToRanking.bind(this);
  }

  getAssertion() {
    const { player: { assertions } } = this.props;
    const n = 3;
    if (assertions >= n) {
      return 'Mandou bem!';
    }
    if (assertions < n) {
      return 'Podia ser melhor...';
    }
  }

  getAssertionsText(assertions) {
    switch (assertions) {
    case 0:
      return 'Não acertou nenhuma pergunta';
    default:
      return `Acertou ${assertions} perguntas`;
    }
  }

  redirectToLogin() {
    this.setState({ redirectToLogin: true });
  }

  redirectToRanking() {
    this.setState({ redirectToRanking: true });
  }

  render() {
    const { player: { score, assertions } } = this.props;
    const { redirectToLogin, redirectToRanking } = this.state;
    if (redirectToLogin) return <Redirect to="/" />;
    if (redirectToRanking) return <Redirect to="/ranking" />;
    return (
      <>
        <Header />
        <div className="container box-accent box-feedback">
          <h1> Feedback </h1>
          <div className="box-feedback__flex">
            <div className="box-feedback-score">
              <Badge
                text="Score"
                value={ score }
                classList="badge-primary-white"
                dataTestId="feedback-total-score"
                classIcon="bi bi-trophy-fill"
              />
              <Badge
                text="Assertions"
                value={ assertions }
                classList="badge-primary-white"
                dataTestId="feedback-total-question"
                classIcon="bi bi-bullseye"
              />
            </div>
            <div className="box-feedback-assertions">
              <p data-testid="feedback-text">{ this.getAssertion() }</p>
            </div>
          </div>
          <div className="box-feedback-button">
            <Button
              text="Ranking"
              key="button-ranking"
              type="button"
              classList="button-outline-primary"
              dataTestId="btn-ranking"
              handleClick={ this.redirectToRanking }
            />
            <Button
              text="Jogar novamente"
              key="button-play-again"
              type="button"
              classList="button-primary"
              dataTestId="btn-play-again"
              handleClick={ this.redirectToLogin }
            />
          </div>
        </div>
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

export default connect(mapStateToProps, null)(Feedback);
