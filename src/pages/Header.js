import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import './Header.css';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    const { getName, getEmail, getScore } = this.props;

    const CONVERTED_EMAIL = md5(getEmail).toString();
    const URL_GRAVATAR = `https://www.gravatar.com/avatar/${CONVERTED_EMAIL}`;

    return (
      <div className="headerTrivia">
        <img
          src={ URL_GRAVATAR }
          alt="Profile Thumbnail"
          data-testid="header-profile-picture"
        />
        <h3 data-testid="header-player-name">
          Nome do Jogador:
          {' '}
          { getName }
        </h3>
        <h3 data-testid="header-score">
          Pontuação:
          {' '}
          { getScore }
        </h3>
        <Link to="/ranking">
          <button type="button" data-testid="btn-ranking">
            Ver Ranking
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getName: state.player.name,
  getEmail: state.player.gravatarEmail,
  getScore: state.player.score,
});

Header.propTypes = {
  getName: PropTypes.string.isRequired,
  getEmail: PropTypes.string.isRequired,
  getScore: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Header);
