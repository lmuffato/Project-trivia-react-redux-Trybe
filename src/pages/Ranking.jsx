import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import Button from '../components/button/Button';

class Ranking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToLogin: false,
    };
    this.redirectToLogin = this.redirectToLogin.bind(this);
  }

  redirectToLogin() {
    this.setState({ redirectToLogin: true });
  }

  render() {
    const { ranking } = this.props;
    const { redirectToLogin } = this.state;
    if (redirectToLogin) return <Redirect to="/" />;
    return (
      <div className="container box-accent box-feedback">
        <h1 data-testid="ranking-title"> Ranking </h1>
        <ul>
          { ranking
            .sort((a, b) => b.score - a.score)
            .map(({ name, score, picture }, index) => (
              <li key={ `${index}ª Posição` }>
                <div>
                  <img src={ picture } alt="Avatar do Player" />
                </div>
                <span data-testid={ `player-name-${index}` }>{ name }</span>
                <span data-testid={ `player-score-${index}` }>{ score }</span>
              </li>
            ))}
        </ul>
        <div className="box-feedback-button">
          <Button
            text="Jogar novamente"
            key="button-play-again"
            type="button"
            classList="button-primary"
            dataTestId="btn-go-home"
            handleClick={ this.redirectToLogin }
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ranking: state.ranking,
});

Ranking.propTypes = {
  ranking: PropTypes.arrayOf({
    name: PropTypes.string,
    score: PropTypes.number,
    picture: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps, null)(Ranking);
