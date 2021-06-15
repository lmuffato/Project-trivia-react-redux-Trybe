import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import Questions from '../components/Questions';
// import { getQuestions } from '../services/triviaAPI';
import { getAPIThunk } from '../redux/actions/actions';

import './Jogo.css';

class Jogo extends Component {
  componentDidMount() {
    const { dispatchAPI } = this.props;
    dispatchAPI();
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

    console.log(questions);

    return (
      <div>
        <header>
          {this.renderGravatarImage()}
          <span data-testid="header-player-name">{ nome }</span>
          <span data-testid="header-score">0</span>

        </header>
        <h1>Página do Jogo</h1>

        {questions && questions.length && <Questions questions={ questions } />}

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
