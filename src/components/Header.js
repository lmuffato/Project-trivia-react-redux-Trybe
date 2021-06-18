import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as api from '../services/datasApi';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: '',
    };
  }

  componentDidMount() {
    const { email, nome } = this.props;
    const state = { player: {
      name: nome,
      assertions: 0,
      score: 0,
      gravatarEmail: email,
    } };
    if (!localStorage.getItem('state')) {
      localStorage.setItem('state', JSON.stringify(state));
    }
    api.fetchGravatar(email).then((imgUrl) => this.setState({ imgUrl }));
  }

  render() {
    const { nome, score } = this.props;
    const { imgUrl } = this.state;
    return (
      <>
        <img
          data-testid="header-profile-picture"
          src={ imgUrl }
          alt="Perfil"
        />
        <p data-testid="header-player-name">{ nome }</p>
        <p data-testid="header-score">{ score }</p>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  nome: state.loginReduce.nome,
  email: state.loginReduce.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
