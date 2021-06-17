// header component

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

function Header({ email, user, score }) {
  const handleUserImage = () => {
    const hashEmail = md5(email).toString();
    // console.log(hashEmail);
    const endpoint = `https://www.gravatar.com/avatar/${hashEmail}`;
    return endpoint;
  };

  const userImage = handleUserImage();

  return (
    <div>
      <img
        src={ userImage }
        alt="User"
        data-testid="header-profile-picture"
      />
      <span data-testid="header-player-name">{ user }</span>
      <span data-testid="header-score">
        { score }
      </span>
    </div>
  );
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.userReducer.email,
  user: state.userReducer.user,
  score: state.userReducer.score,
});

export default connect(mapStateToProps, null)(Header);
