import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUserImage } from '../actions/index';

class Game extends Component {
  render() {
    const { emailDoUsuario, nomeDoUsuario } = this.props;
    const hashGerada = md5(emailDoUsuario).toString();
    return (
      <div>
        <header>
          <img src={ `https://www.gravatar.com/avatar/${hashGerada}` } alt="usário" data-testid="header-profile-picture" />
          <p data-testid="header-player-name">{nomeDoUsuario}</p>
          <p data-testid="header-score">0</p>
        </header>
        <h1>Pagina do Jogo</h1>
      </div>
    );
  }
}

const mapStateToProps = ({ player: { email, name } }) => ({
  emailDoUsuario: email,
  nomeDoUsuario: name,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchImageUrl: (url) => dispatch(getUserImage(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  emailDoUsuario: PropTypes.string,
  nomeDoUsuario: PropTypes.string,
  dispatchImageUrl: PropTypes.func,
}.isRequired;
