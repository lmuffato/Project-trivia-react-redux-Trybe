import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import Badge from './badge/Badge';
import logo from '../trivia.png';

class Header extends Component {
  convertEmailToHash(email) {
    const hash = md5(email).toString();
    return `https://www.gravatar.com/avatar/${hash}`;
  }

  render() {
    const { player: { name, gravatarEmail, score } } = this.props;
    return (
      <header>
        <div className="container">
          <img
            src={ logo }
            alt="Logo do Trivia"
          />
          <div className="box-score">
            <img
              src={ this.convertEmailToHash(gravatarEmail) }
              alt="Avatar do Player"
              data-testid="header-profile-picture"
            />
            <div className="box-score-badges">
              <Badge
                text="Jogador"
                value={ name }
                classList="badge-secondary"
                classIcon="bi bi-person-fill"
                dataTestId="header-player-name"
              />
              <Badge
                text="Score"
                value={ score }
                classIcon="bi bi-trophy-fill"
                classList="badge-secondary"
                dataTestId="header-score"
              />
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
