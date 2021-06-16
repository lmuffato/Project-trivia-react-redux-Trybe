import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { gravatarImg, name } = this.props;
    return (
      <>
        <img
          src={ gravatarImg }
          alt="Imagem do Usuário"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{name}</p>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatarImg: state.login.emailConverter,
  name: state.login.user,
});

Header.propTypes = {
  gravatarImg: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
