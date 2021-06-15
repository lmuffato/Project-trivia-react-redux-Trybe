import React from 'react';
import { connect } from 'react-redux';

class Feedback extends React.Component {
  render() {
    const { name, score } = this.props;
    return (
      <section>
        <header>
          <img
            data-testid="header-profile-picture"
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
            alt="avatar"
          />
          <p
            data-testid="header-player-name"
          >
            { name }
          </p>
          <span
            data-testid="header-score"
          >
            { score }
          </span>
        </header>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.playerFunction.player.name,
  score: state.playerFunction.player.score,
});

export default connect(mapStateToProps, null)(Feedback);
