import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

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
    const { nome, questions } = this.props;
    const { time, revelaBorda } = this.state;

    return (
      <div>
        <header>
          {this.renderGravatarImage()}
          <span data-testid="header-player-name">{ nome }</span>
          <span data-testid="header-score">0</span>

        </header>
        <h1>Página do Jogo</h1>

        <Timer time={ time } setTimer={ this.setTimer } />

        {questions && questions.length && (<Questions
          questions={ questions }
          revelaBorda={ revelaBorda }
          setRevelaBorda={ this.setRevelaBorda }
        />)}
      </div>
    );
  }
}

Jogo.propTypes = {
  email: PropTypes.string,
  nome: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.loginReducer.email,
  nome: state.loginReducer.nome,
  questions: state.jogoReducer.results,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchAPI: (payload) => dispatch(getAPIThunk(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Jogo);
