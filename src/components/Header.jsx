import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  convertEmailToHash(email) {
    const hash = md5(email).toString();
    return `https://www.gravatar.com/avatar/${hash}`;
  }

  render() {
    const { player: { name, gravatarEmail, score } } = this.props;
    return (
      <header className="w-100 bg-dark text-white">
        <div className="container d-flex align-items-center justify-content-between p-3">
          <img
            src={ this.convertEmailToHash(gravatarEmail) }
            alt="Avatar do Player"
            className="rounded-circle"
            data-testid="header-profile-picture"
          />
          <div className="d-flex flex-block">
            <div className="badge bg-primary mb-2">
              <span>Jogador </span>
              <span
                className="bold badge bg-dark"
                data-testid="header-player-name"
              >
                { name }
              </span>
            </div>
            <div className="badge bg-primary">
              <span>Score </span>
              <span
                className="bold badge bg-dark"
                data-testid="header-score"
              >
                { score }
              </span>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

Header.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    gravatarEmail: PropTypes.string,
    score: PropTypes.number,
  }).isRequired,
};

export default connect(mapStateToProps)(Header);
