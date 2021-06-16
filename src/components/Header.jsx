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
    const { urLink, user: { username }, score } = this.props;
    // const score = getLocalStorage('score');
    return (
      <div>
        <h1 data-testid="header-player-name">{ username }</h1>
        <h3 data-testid="header-score">{ score }</h3>
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

function mapStateToProps(state) {
  return {
    urLink: state.gravatar.url,
    user: state.user,
    score: state.trivia.score,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    gravatarImage: (email) => dispatch(getGravatarImage(email)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
