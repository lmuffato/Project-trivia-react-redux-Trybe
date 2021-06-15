import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { name, score, gravatar } = this.props;
    return (
      <header>
        <img src={ gravatar } alt="user" data-testid="header-profile-picture" />
        <span data-testid=" header-player-name ">{ name }</span>
        <span data-testid="header-score">{ score }</span>
      </header>
    );
  }
}

Header.propTypes = {

}.isRequired;

export default Header;
