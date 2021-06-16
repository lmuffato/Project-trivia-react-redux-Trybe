import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import './Header.css';

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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getName: state.user.nome,
  getEmail: state.user.email,
  getScore: state.user.score,
});

Header.propTypes = {
  getName: PropTypes.string.isRequired,
  getEmail: PropTypes.string.isRequired,
  getScore: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Header);
