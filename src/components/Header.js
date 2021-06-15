import React from 'react';
// import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { userName } = this.props;
    return (
      <header>
        <image data-testid="header-profile-picture">Teste</image>
        <span data-testid="header-player-name">{ userName }</span>
        <span data-testid="header-score">0</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.user.name,
});

Header.propTypes = {
  userName: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
