import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Trivia from '../components/Trivia';
import returnStateLSEmpty from '../services/returnStateLSEmpty';
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
    this.initLocalStorage = this.initLocalStorage.bind(this);
  }

  componentDidMount() {
    if (!localStorage.getItem('state')) {
      console.log('Hora de setar chave state no localStorage.');
      this.initLocalStorage();
    }
  }

  initLocalStorage() {
    const { user } = this.props;
    const emptyKeyState = returnStateLSEmpty(user);
    // console.log(user);
    // console.log(emptyKeyState);
    localStorage.setItem('state', JSON.stringify(emptyKeyState));
    // console.log('Setando local stage inicial!');
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

  renderName(userName) {
    // const { userName } = this.props;
    let nameLS;
    if (localStorage.getItem('name')) {
      nameLS = localStorage.getItem('name');
    }
    console.log(nameLS);
    console.log(userName);
    return (
      <span
        data-testid="header-player-name"
      >
        Jogador:
        {' '}
        {nameLS || userName || 'Jogador'}
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
    const { userName } = this.props;
    return (
      <>
        <header>
          {this.renderGravatar()}
          {this.renderName(userName)}
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
  user: state.user,
  pointsGlobal: state.trivia.points,
});

Game.propTypes = {
  userName: PropTypes.func.isRequired,
  pointsGlobal: PropTypes.number.isRequired,
  user: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Game);
