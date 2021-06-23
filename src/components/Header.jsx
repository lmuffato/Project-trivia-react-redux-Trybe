import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { addGravatar } from '../redux/actions';
import '../styles/header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.getGravatar = this.getGravatar.bind(this);
  }

  getGravatar() {
    const { email, gravatar } = this.props;
    const hash = md5(email).toString();
    const imageURL = `https://br.gravatar.com/avatar/${hash}`;
    gravatar(imageURL);
    return imageURL;
  }

  render() {
    const { name = 'user Name', score = 0 } = this.props;
    return (
      <header className="header">
        <img
          src={ this.getGravatar() }
          alt="user"
          data-testid="header-profile-picture"
          className="avatar-header"
        />
        <span data-testid="header-player-name" className="header-name">{ name }</span>
        <span data-testid="header-score">{ score }</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  email: state.player.email,
});

const mapDispatchToProps = (dispatch) => ({
  gravatar: (url) => dispatch(addGravatar(url)),
});

Header.propTypes = {
  name: PropTypes.string,
  score: PropTypes.number,
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Header);
