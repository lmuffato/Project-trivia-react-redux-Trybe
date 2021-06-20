import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import './Header.css';
import { Link } from 'react-router-dom';
import { setUrlAction } from '../actions/index';

class Header extends Component {
  constructor() {
    super();

    this.getUrlGravatar = this.getUrlGravatar.bind(this);
  }

  getUrlGravatar() {
    const { getEmail, setUrl } = this.props;
    const CONVERTED_EMAIL = md5(getEmail).toString();
    const URL_GRAVATAR = `https://www.gravatar.com/avatar/${CONVERTED_EMAIL}`;
    setUrl(URL_GRAVATAR);
    return (<img
      src={ URL_GRAVATAR }
      alt="Profile Thumbnail"
      data-testid="header-profile-picture"
    />);
  }

  render() {
    const { getName, getScore } = this.props;

    return (
      <div className="headerTrivia">
        {this.getUrlGravatar()}
        <h3 data-testid="header-player-name">
          Nome do Jogador:
          {' '}
          { getName }
        </h3>
        <h3>
          Ver Pontuação:
          <span data-testid="header-score">{ getScore }</span>
        </h3>
        <Link to="/ranking">
          <button type="button">Ver Ranking</button>
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

const mapDispatchToProps = (dispatch) => ({
  setUrl: (state) => dispatch(setUrlAction(state)),
});

Header.propTypes = {
  getName: PropTypes.string.isRequired,
  getEmail: PropTypes.string.isRequired,
  getScore: PropTypes.number.isRequired,
  setUrl: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
