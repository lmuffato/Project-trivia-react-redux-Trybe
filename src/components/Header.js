import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { email, name, score } = this.props;
    return (
      <header>
        <div>
          <img
            className="header-avatar"
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
            alt="user gravatar"
          />
        </div>
        <div>
          <p data-testid="header-player-name">
            Jogador:
            {' '}
            {name}
          </p>
          <p data-testid="header-score">
            { score }
          </p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = ({ player: { email, name, score } }) => ({
  email,
  name,
  score,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
