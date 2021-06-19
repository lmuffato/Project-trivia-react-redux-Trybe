// Requeisito 4 - Criar um componente Header com imagem, nome da pessoa jogadora e placar.
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './header.css';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  constructor() {
    super();

    this.getAvatar = this.getAvatar.bind(this);
  }

  componentDidCatch() {
    this.getScoreStorage();
  }

  // Faz requisção a api do gravatar para gerar o avatar
  getAvatar() {
    const { email } = this.props;
    const hash = md5(email).toString();
    const avatarGravatar = `https://www.gravatar.com/avatar/${hash}`;
    return avatarGravatar;
  }

  render() {
    // const { userName } = this.props;
    const { nextTimerState } = this.props;
    const storagePlayer = JSON.parse(localStorage.getItem('state'));
    const { score } = storagePlayer.player;
    return (
      <header className="header">
        <img
          data-testid="header-profile-picture"
          src={ this.getAvatar() }
          alt="avatar do jogador"
          height="70"
          width="80"
        />
        <p data-testid="header-player-name">
          { storagePlayer.player.name }
        </p>
        <p data-testid="header-score">
          { nextTimerState ? `Score: ${score}` : `Score: ${score}` }
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  userName: PropTypes.string,
  emial: PropTypes.string,
}.isRequired;

// Recupera as informções do estado global para utilizar no componente Header
const mapStateToProps = (state) => ({
  email: state.userReducer.email,
  userName: state.userReducer.userName,
  nextTimerState: state.triviaReducer.nextTimer,
});

export default connect(mapStateToProps)(Header);
