import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { gravatarImg } from '../actions/action';

class Header extends Component {
  componentDidMount() {
    const { avatarImg, user: { email } } = this.props;
    console.log(email);
    avatarImg(email);
  }

  render() {
    const { urLink, user: { username } } = this.props;
    return (
      <div>
        <h1>{ username }</h1>
        <h3>0</h3>
        <img src={ urLink } alt="Avatar" />
      </div>
    );
  }
}

Header.propTypes = {
  avatarImg: PropTypes.func,
  urLink: PropTypes.string,
}.isRequired;

function mapDispatchToProps(dispatch) {
  return {
    avatarImg: (email) => dispatch(gravatarImg(email)),
  };
}

function mapStateToProps(state) {
  return {
    urLink: state.gravatar.url,
    user: state.user,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);