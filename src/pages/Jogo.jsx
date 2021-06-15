import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
// import { getQuestions } from '../services/triviaAPI';
import { getAPIThunk } from '../redux/actions/actions';

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
    // console.log(dispatchAPI());
    return (
      <div>
        {questions.map((question, id) => (
          <div key={ id }>
            <h3>{question.question}</h3>
          </div>
        ))}
        <header>
          {this.renderGravatarImage()}
          <span data-testid="header-player-name">{ nome }</span>
          <span data-testid="header-score">0</span>
        </header>
        <h1>Página do Jogo</h1>
        <div>
          <span data-testid="question-category">Categoria</span>
          <p data-testid="question-text">texto da pergunta</p>
          <div>
            <button type="button">question 1</button>
            <button type="button">question 2</button>
            <button type="button">question 3</button>
            <button type="button">question 4</button>
          </div>
        </div>
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
