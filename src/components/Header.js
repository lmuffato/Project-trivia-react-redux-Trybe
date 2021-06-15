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
    const { email } = this.props;
    api.fetchGravatar(email).then((imgUrl) => this.setState({ imgUrl }));
  }

  render() {
    const { nome } = this.props;
    const { imgUrl } = this.state;
    return (
      <>
        <img
          data-testid="header-profile-picture"
          src={ imgUrl }
          alt="Perfil"
        />
        <p data-testid="header-player-name">{ nome }</p>
        <p data-testid="header-score">0</p>
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
};

export default connect(mapStateToProps)(Header);
