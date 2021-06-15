// header component

import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
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
    // const userImage = this.handleUserImage();
    return (
      <div>
        <img
          src=""
          alt="User"
          data-testid="header-profile-picture"
        />
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default Header;
