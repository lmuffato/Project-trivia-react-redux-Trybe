// header component

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js';

class Header extends React.Component {
  handleUserImage() {
    const { email } = this.props;
    const hashEmail = md5(email).toString();
    console.log(hashEmail);
    const endpoint = `https://www.gravatar.com/avatar/${hashEmail}`;
    const request = fetch(endpoint);
    console.log(request);
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <img
          src={ () => this.handleUserImage() }
          alt="User"
          data-testid="header-profile-picture"
        />
        <span data-testid="header-player-name">{ user }</span>
        <span data-testid="header-score"> 0 </span>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.userReducer.email,
  user: state.userReducer.user,
});

export default connect(mapStateToProps)(Header);
