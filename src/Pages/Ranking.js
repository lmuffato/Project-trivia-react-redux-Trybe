import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

class Ranking extends Component {
  constructor() {
    super();
    this.renderImgGravatar = this.renderImgGravatar.bind(this);
  }

  // cria uma lista com as informações de cada jogador com as informações do estado global
  renderImgGravatar() {
    const gravatarImg = localStorage.getItem('token');
    console.log(gravatarImg);
  }

  render() {
    return (
      <div>
        { this.renderImgGravatar }
        <Link to="/">
          <button data-testid="btn-go-home" type="button">Voltar ao início</button>
        </Link>
      </div>
    );
  }
// Requisito 18 - Botão usado para retornar ao início;
}
// Pegando o estado Global
/* const mapStateToProps = (state) => ({
  stateGotten: state.userReducer,
});

Ranking.propTypes = {
  stateGotten: PropTypes.arrayOf(PropTypes.object).isRequired,
}; */

export default connect(mapStateToProps)(Ranking);
