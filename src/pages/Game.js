import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import Trivia from '../components/Trivia';
// import user from '../reducers/user';

class Game extends Component {
  constructor(props) {
    super(props);
    this.renderGravatar = this.renderGravatar.bind(this);
    this.renderName = this.renderName.bind(this);
    this.renderScore = this.renderScore.bind(this);
  }

  renderGravatar() {
    const user = JSON.parse(localStorage.getItem('state')).player.gravatarEmail;
    return (
      <img
        src={ `https://www.gravatar.com/avatar/${md5(user)}` }
        alt="gravatar"
        data-testid="header-profile-picture"
      />
    );
  }

  renderName() {
    const { userName } = this.props;
    return (
      <span
        data-testid="header-player-name"
      >
        {userName}
      </span>
    );
  }

  renderScore() {
    const { pointsGlobal } = this.props;
    let scoreLS = null;
    if (localStorage.getItem('state')) {
      const stateLS = JSON.parse(localStorage.getItem('state'));
      scoreLS = stateLS.player.score;
    }
    return (
      <h1
        data-testid="header-score"
      >
        { Number(pointsGlobal) || scoreLS || 0 }
      </h1>
    );
  }

  render() {
    return (
      <>
        <header>
          {this.renderGravatar()}
          {this.renderName()}
          {this.renderScore()}
        </header>
        <main>
          <Trivia />
        </main>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.user.name,
  pointsGlobal: state.trivia.points,
});

Game.propTypes = {
  userName: PropTypes.func.isRequired,
  pointsGlobal: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Game);
