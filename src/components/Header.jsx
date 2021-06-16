import React, { Component } from 'react';
import { connect } from 'react-redux';
import { object } from 'prop-types';

class Header extends Component {
  render() {
    const { player: { name, score, picture } } = this.props;
    return (
      <header className="header-content">
        <img
          src={ picture }
          alt="gravatar-img"
          data-testid="header-profile-picture"
        />
        <div className="player-content">
          <p data-testid="header-player-name"><strong>{ `Player: ${name}` }</strong></p>
          <p>
            Score:
            <strong>
              <span data-testid="header-score">{ score }</span>
            </strong>
          </p>
        </div>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    player: state.player,
  };
}

Header.propTypes = {
  player: object,
}.isRequired;

export default connect(mapStateToProps)(Header);
