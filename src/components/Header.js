import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { saveAvatar } from '../actions';

class Header extends React.Component {
  requestAvatar() {
    const { emailStore, sendAvatar } = this.props;
    const emailHash = md5(emailStore).toString();
    const avatar = `https://www.gravatar.com/avatar/${emailHash}`;
    sendAvatar(avatar);
  }

  render() {
    const { nameStore, scoreStore, emailHash } = this.props;
    console.log(scoreStore);
    this.requestAvatar();
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

const mapDispatchToProps = (dispatch) => ({
  sendAvatar: (avatar) => dispatch(saveAvatar(avatar)),
});

Header.propTypes = {
  nameStore: PropTypes.string,
  emailStore: PropTypes.string,
  scoreStore: PropTypes.number,
}.isRequired;

export default connect(MapStateToProps, mapDispatchToProps)(Header);
