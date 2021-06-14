import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';

class Header extends Component {
  render() {
    const { name, email } = this.props;
    const hashEmail = MD5(email);
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={`https://www.gravatar.com/avatar/${hashEmail}`}
          alt="imagem-perfil"
        />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">0</p>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.login.name,
  email: state.login.email,
});

export default connect(mapStateToProps, null)(Header);
