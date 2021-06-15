import React from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  handleImage() {
    const { email } = this.props;
    const emailConversion = md5(email).toString();
    const gravatar = `https://www.gravatar.com/avatar/${emailConversion}`;
    return gravatar;
  }

  render() {
    const { name } = this.props;
    console.log(name);
    return (
      <>
        <img
          src={ this.handleImage() }
          alt="userImage"
          data-testid="header-profile-picture"
        />
        <h3 data-testid="header-player-name">{name}</h3>
        <h3 data-testid="header-score">Score: 0</h3>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.login.email,
  name: state.login.name,
});

Header.propTypes = {
  email: PropTypes.string,
  userName: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, null)(Header);
