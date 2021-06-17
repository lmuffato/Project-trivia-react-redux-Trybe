import React from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  handleImage() {
    const { gravatarEmail } = this.props;
    const emailConversion = md5(gravatarEmail).toString();
    const gravatar = `https://www.gravatar.com/avatar/${emailConversion}`;
    return gravatar;
  }

  render() {
    const { name, score } = this.props;
    return (
      <>
        <img
          src={ this.handleImage() }
          alt="userImage"
          data-testid="header-profile-picture"
        />
        <h3 data-testid="header-player-name">{name}</h3>
        <h3 data-testid="header-score">{` Score: ${score} `}</h3>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
  score: state.score.score,
});

Header.propTypes = {
  email: PropTypes.string,
  userName: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, null)(Header);
