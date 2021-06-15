import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  render() {
    const { nameStore, emailStore, scoreStore } = this.props;
    const emailHash = md5(emailStore).toString();
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${emailHash}` }
          alt="user"
        />
        <p data-testid="header-player-name">{ nameStore }</p>
        <p data-testid="header-score">{ scoreStore }</p>
      </header>
    );
  }
}

const MapStateToProps = (state) => ({
  nameStore: state.player.name,
  emailStore: state.player.gravatarEmail,
  scoreStore: state.player.score,
});

Header.propTypes = {
  nameStore: PropTypes.string.isRequired,
  emailStore: PropTypes.string.isRequired,
  scoreStore: PropTypes.number.isRequired,
};

export default connect(MapStateToProps)(Header);
