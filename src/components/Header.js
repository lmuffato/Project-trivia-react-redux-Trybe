import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { userName, userEmail, score, assertions } = this.props;
    const hashEmail = md5(userEmail).toString();
    const state = JSON.stringify({
      player: {
        name: userName, assertions, score, gravatarEmail: userEmail,
      } });
    localStorage.setItem('state', state);
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${hashEmail}` }
          data-testid="header-profile-picture"
          alt="Avatar"
        />
        <span data-testid="header-player-name">
          Player name:
          { userName }
        </span>
        <span data-testid="header-score">
          Score:
          { score }
        </span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.user.name,
  userEmail: state.user.gravatarEmail,
  score: state.user.score,
  assertions: state.user.assertions,
});

Header.propTypes = {
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
