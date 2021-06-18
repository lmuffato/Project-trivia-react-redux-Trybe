import React from 'react';
import CryptoJS from 'crypto-js';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      difficultPoint: 0,
    };
  }

  componentDidMount() {
    const { props: { difficulty, currentySeconds, answer } } = this;
    let difficultPoint = 0;
    switch (difficulty) {
    case 'hard':
      difficultPoint = 3;
      break;
    case 'medium':
      difficultPoint = 2;
      break;
    case 'easy':
      difficultPoint = 1;
      break;
    default:
      return difficultPoint;
    }
    console.log(difficultPoint);
    this.setState({ difficultPoint });
  }

  globalState() {
    const jsonGetState = localStorage.getItem('state');
    const jsonConvState = JSON.parse(jsonGetState);
    return jsonConvState;
  }

  gravatar() {
    const jsonGetState = localStorage.getItem('state');
    const jsonConvState = JSON.parse(jsonGetState);
    const hash = CryptoJS.MD5(jsonConvState.player.email).toString();
    return hash;
  }

  render() {
    const hash = this.gravatar();
    const global = this.globalState();
    const { props: { currentySeconds, answer },
      state: { difficultPoint } } = this;
    const correctAnswer = answer === 'correct-answer';
    return (
      <>
        <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${hash}` } alt="imagem de perfil" />
        <p data-testid="header-player-name">{ global.player.name }</p>
        <p data-testid="header-score">{ global.player.score }</p>
        { correctAnswer ? (10 + (currentySeconds * difficultPoint)) : 0 }
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currentySeconds: state.timer.seconds,
});

export default connect(mapStateToProps, null)(Header);
