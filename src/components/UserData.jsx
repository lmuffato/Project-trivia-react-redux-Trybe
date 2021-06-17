import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

// vamo que vamo

class UserData extends Component {
  render() {
    const state = JSON.parse(localStorage.getItem('state')) || 0;
    const { userEmail, userName } = this.props;
    return (
      <div>
        <p data-testid="header-player-name">{ userName }</p>
        <img
          src={ `https://www.gravatar.com/avatar/${md5(userEmail).toString()}` }
          alt="header-img"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-score">{ state ? state.player.score : 0}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.userData.email,
  userName: state.userData.name,
});

UserData.propTypes = {
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(UserData);
