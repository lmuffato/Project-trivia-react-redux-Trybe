import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Trivia from '../components/Trivia';
// import user from '../reducers/user';

class Game extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   email: '',
    // };
    this.renderGravatar = this.renderGravatar.bind(this);
    this.renderName = this.renderName.bind(this);
    this.renderScore = this.renderScore.bind(this);
  }

  renderGravatar() {
    return (
      <img
        src=""
        alt="gravatar"
        data-testid="header-profile-picture"
      />
    );
  }

  renderName() {
    const { userName } = this.props;
    return (
      <h1
        data-testid="header-player-name"
      >
        {userName}
      </h1>
    );
  }

  renderScore() {
    const { pointsGlobal } = this.props;

    return (
      <h1
        data-testid="header-score"
      >
        { Number(pointsGlobal) }
      </h1>
    );
  }

  render() {
    return (
      <>
        <header>
          {this.renderGravatar()}
          {this.renderName()}
          {this.renderScore()}
        </header>
        <main>
          <Trivia />
        </main>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.user.name,
  // userEmail: state.email,
  pointsGlobal: state.trivia.points,
});

Game.propTypes = {
  userName: PropTypes.func.isRequired,
  pointsGlobal: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Game);
