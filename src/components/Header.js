import React from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import getUserImg from '../services/gravatarApi';
import '../css/Header.css';

class Header extends React.Component {
  render() {
    const { name, score, gravatarEmail } = this.props;
    return (
      <header>
        <div>
          <figure>
            <img
              src={ getUserImg(gravatarEmail) }
              alt="userImg"
              data-testid="header-profile-picture"
              className="gravatar"
            />
            <legend data-testid="header-player-name">{ name }</legend>
          </figure>
        </div>
        <div className="score">
          <p>Score</p>
          <p data-testid="header-score">{ score }</p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = ({ player: { name, gravatarEmail, score } }) => ({
  name,
  gravatarEmail,
  score,
});

Header.propTypes = {
  name: Proptypes.string.isRequired,
  score: Proptypes.number.isRequired,
  gravatarEmail: Proptypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
