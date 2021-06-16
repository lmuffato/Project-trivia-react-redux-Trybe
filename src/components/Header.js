import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';

class Header extends Component {
  recordLocalStore() {
    const { name, email, score, correct } = this.props;

    localStorage.state = JSON.stringify({
      player: {
        name,
        assertions: correct,
        score,
        gravatarEmail: email,
      },
    });
  }

  render() {
    const { name, email, score } = this.props;
    const hashEmail = MD5(email);
    this.recordLocalStore();
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hashEmail}` }
          alt="imagem-perfil"
        />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">{score}</p>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  correct: PropTypes.number.isRequired,
};

const mapStateToProps = ({ login: { name, email, score, correct } }) => (
  { name, email, score, correct }
);

export default connect(mapStateToProps, null)(Header);
