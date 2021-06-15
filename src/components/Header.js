import React from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { name, score, gravatarEmail } = this.props;
    return (
      <header>
        <figure>
          <img src={ gravatarEmail } alt="userImg" data-testid="header-profile-picture" />
          <legend data-testid="header-player-name">{ name }</legend>
        </figure>
        <p>Score</p>
        <p data-testid="header-score">{ score }</p>
      </header>
    );
  }
}

const mapStateToProps = ({ player: { name, gravatarEmail } }) => ({
  name,
  gravatarEmail,
});

Header.propTypes = {
  name: Proptypes.string.isRequired,
  score: Proptypes.number.isRequired,
  gravatarEmail: Proptypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
