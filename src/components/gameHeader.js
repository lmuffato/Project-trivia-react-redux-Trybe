import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { gravatarImg, name, score } = this.props;
    return (
      <div className="navbar">
        <div className="navbar-brand">
          <img
            src={ gravatarImg }
            alt="Imagem do Usuário"
            data-testid="header-profile-picture"
            className="userIMG"
          />
        </div>
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">{ score }</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatarImg: state.login.emailConverter,
  name: state.login.user,
  score: state.game.placar,
});

Header.propTypes = {
  gravatarImg: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
