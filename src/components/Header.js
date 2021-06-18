// header component

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { userImage } from '../actions';

function Header({ email, user, score, saveUserImage }) {
  const handleUserImage = () => {
    const hashEmail = md5(email).toString();
    // console.log(hashEmail);
    const endpoint = `https://www.gravatar.com/avatar/${hashEmail}.png`;
    saveUserImage(endpoint);
    return endpoint;
  };

  const image = handleUserImage();
  // handleGetLocalStorage() {
  //   const userScore = localStorage.getItem(JSON.parse(state));
  //   if (userScore) {
  //       console.log(userScore);
  //   }
  // }

  return (
    <div>
      <img
        src={ image }
        alt="User"
        data-testid="header-profile-picture"
      />
      <span data-testid="header-player-name">{ user }</span>
      <span data-testid="header-score">{ score }</span>
    </div>
  );
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  saveUserImage: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveUserImage: (image) => dispatch(userImage(image)),
});
const mapStateToProps = (state) => ({
  email: state.userReducer.email,
  user: state.userReducer.user,
  score: state.userReducer.score,
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
