import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bool, object } from 'prop-types';
import Questions from '../components/Questions';
import { getQuestion } from '../actions';

class Game extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     algo: '',
  //   };
  // }

  componentDidMount() {
    const { requestQuestions } = this.props;
    const token = localStorage.getItem('token');
    requestQuestions(token);
  }

  render() {
    const { isLoading, player: { name, score, picture } } = this.props;
    return (
      <div>
        <header>
          <img
            src={ picture }
            alt="gravatar-img"
            data-testid="header-profile-picture"
          />
          <p data-testid="header-player-name">{ name }</p>
          <p data-testid="header-score">{ score }</p>
        </header>
        {!isLoading ? <Questions /> : 'carregando....'}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.gameData.isLoading,
  player: state.player,
});

const mapDispatchToProps = (dispatch) => ({
  requestQuestions: (token) => dispatch(getQuestion(token)),
});

Game.propTypes = {
  isLoading: bool,
  player: object,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
