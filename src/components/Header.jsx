import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchGravatar } from '../redux/actions';

class Header extends React.Component {
  componentDidMount() {
    const { gravatarAction, email } = this.props;
    gravatarAction(email);
  }

  render() {
    const { name = 'user Name', score = 0, gravatar } = this.props;
    return (
      <header>
        <img src={ gravatar } alt="user" data-testid="header-profile-picture" />
        <span data-testid=" header-player-name ">{ name }</span>
        <span data-testid="header-score">{ score }</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  gravatar: state.player.gravatar,
  email: state.player.email,
});

const mapDispatchToProps = (dispatch) => ({
  gravatarAction: (email) => dispatch(fetchGravatar(email)),
});

Header.propTypes = {
  name: PropTypes.string,
  score: PropTypes.number,
  gravatar: PropTypes.string,
  gravatarAction: PropTypes.func,
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Header);
