import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGravatarImage } from '../actions/action';

class Header extends Component {
  componentDidMount() {
    const { gravatarImage, user: { email } } = this.props;
    gravatarImage(email);
  }

  render() {
    const { urLink, user: { username } } = this.props;
    return (
      <div>
        <h1 data-testid="header-player-name">{ username }</h1>
        <h3 data-testid="header-score">0</h3>
        <img
          data-testid="header-profile-picture"
          src={ urLink }
          alt="Avatar"
        />
      </div>
    );
  }
}

Header.propTypes = {
  gravatarImage: PropTypes.func,
  urLink: PropTypes.string,
}.isRequired;

function mapDispatchToProps(dispatch) {
  return {
    gravatarImage: (email) => dispatch(getGravatarImage(email)),
  };
}

function mapStateToProps(state) {
  return {
    urLink: state.gravatar.url,
    user: state.user,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
