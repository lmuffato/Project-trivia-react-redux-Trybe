import React, { Component } from 'react';
import { string } from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { userName, userEmail } = this.props;
    return (
      <div className="header">
        <img
          src={ `https://www.gravatar.com/avatar/${md5(userEmail)}` }
          alt="Sua Foto do Gravatar"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{ userName }</p>
        <p data-testid="header-score">0</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.login.name,
  userEmail: state.login.email,
});

Header.propTypes = {
  name: string,
  email: string,
}.isRequired;

export default connect(mapStateToProps, null)(Header);
