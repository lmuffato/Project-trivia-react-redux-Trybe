import React, { Component } from 'react';
import { connect } from 'react-redux';
import { object } from 'prop-types';

class Game extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     algo: '',
  //   };
  // }

  render() {
    const { player: { name, score, picture } } = this.props;

    return (
      <>
        <header>
          <img
            src={ picture }
            alt="gravatar-img"
            data-testid="header-profile-picture"
          />
          <p data-testid="header-player-name">{ name }</p>
          <p data-testid="header-score">{ score }</p>
        </header>
        <div>Questions</div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

Game.propTypes = {
  player: object,
}.isRequired;

export default connect(mapStateToProps)(Game);
