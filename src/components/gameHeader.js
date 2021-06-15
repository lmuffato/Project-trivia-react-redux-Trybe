import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { gravatarImg, name, placar } = this.props;
    return (
      <>
        <img
          src={ gravatarImg }
          alt="Imagem do Usuário"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">{placar}</p>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatarImg: state.login.emailConverter,
  name: state.login.user,
  placar: state.game.placar,
});

Header.propTypes = {
  gravatarImg: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placar: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
