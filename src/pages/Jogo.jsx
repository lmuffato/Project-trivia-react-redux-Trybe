import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import ReactAudioPlayer from 'react-audio-player';
import Questions from '../components/Questions';
import { getAPIThunk } from '../redux/actions/actions';

import './Jogo.css';
import Timer from '../components/Timer';

class Jogo extends Component {
  constructor(props) {
    super(props);

    this.setTimer = this.setTimer.bind(this);
    this.setRevelaBorda = this.setRevelaBorda.bind(this);

    this.state = {
      time: 30,
      revelaBorda: '',
    };
  }

  componentDidMount() {
    const { dispatchAPI } = this.props;

    dispatchAPI();
  }

  setTimer(timeObj) {
    if (timeObj.time === 0) {
      this.setState({ revelaBorda: 'show' });
    }

    this.setState(timeObj);
  }

  setRevelaBorda(string) {
    this.setState({ revelaBorda: string });
  }

  renderGravatarImage() {
    const { email } = this.props;
    const hashMD5 = md5(email).toString();
    return (
      <img
        src={ `https://www.gravatar.com/avatar/${hashMD5}` }
        alt="avatar"
        data-testid="header-profile-picture"
      />);
  }

  render() {
    const { nome, questions, assertions, score } = this.props;
    const { time, revelaBorda } = this.state;

    return (
      <div>
        <div>
          <header className="header">
            <Link to="/">
              {this.renderGravatarImage()}
            </Link>
            <h1>{assertions}</h1>
            <span data-testid="header-player-name">{ nome }</span>
            <span data-testid="header-score" className="score">{`Score: ${score}`}</span>
          </header>
          <div className="timer">
            <Timer time={ time } setTimer={ this.setTimer } />
          </div>
        </div>
        <h1>Página do Jogo</h1>
        {questions && questions.length && (<Questions
          time={ time }
          questions={ questions }
          revelaBorda={ revelaBorda }
          setRevelaBorda={ this.setRevelaBorda }
        />)}
        <ReactAudioPlayer
          src="https://www.myinstants.com/media/sounds/perguntashowdomilhao.mp3"
          autoPlay
          controls
          className="music"
        />
      </div>
    );
  }
}

Jogo.propTypes = {
  email: PropTypes.string,
  nome: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.loginReducer.user.email,
  nome: state.loginReducer.user.nome,
  questions: state.jogoReducer.results,
  assertions: state.jogoReducer.player.assertions,
  score: state.jogoReducer.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchAPI: (payload) => dispatch(getAPIThunk(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Jogo);
