import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Trivia from '../components/Trivia';
// import user from '../reducers/user';

class Game extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   email: '',
    // };
    this.renderGravatar = this.renderGravatar.bind(this);
    this.renderName = this.renderName.bind(this);
    this.renderScore = this.renderScore.bind(this);
  }

  renderGravatar() {
    return (
      <img
        src=""
        alt="gravatar"
        data-testid="header-profile-picture"
      />
    );
  }

  renderName() {
    const { userName } = this.props;
    let nameLS;
    if (localStorage.getItem('name')) {
      nameLS = localStorage.getItem('name');
    }
    // console.log(nameLS);
    return (
      <h3
        data-testid="header-player-name"
      >
        {nameLS || userName || 'Nome da pessoa'}
      </h3>
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
  // userEmail: state.email,
  pointsGlobal: state.trivia.points,
});

Game.propTypes = {
  userName: PropTypes.func.isRequired,
  pointsGlobal: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Game);
