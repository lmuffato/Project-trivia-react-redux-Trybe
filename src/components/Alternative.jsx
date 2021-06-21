import React, { Component } from 'react';
import { string, func } from 'prop-types';
import { connect } from 'react-redux';
import { decode } from 'he';
import ReactAudioPlayer from 'react-audio-player';
import './Alternatives.css';
import { setAnswerVisibility, stopTimer } from '../redux/actions/actions';

const CORRECT = 'correct-answer';
const WRONG = 'wrong-answer';

class Alternative extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showImg: false,
      showFaustao: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.toasty = this.toasty.bind(this);
  }

  toasty(e) {
    console.log(e.target.name);
    if (e.target.name === 'correct-answer') {
      return (
        this.setState({ showImg: true })
      );
    }
    return (this.setState({ showFaustao: true }));
  }

  imgToasty() {
    const { showImg } = this.state;
    console.log('toasty foi chamada');
    if (showImg === true) {
      return (
        <div>
          <img src="https://images.uncyc.org/pt/2/26/Toasty.png" alt="toasty" className="toasty" />
          <ReactAudioPlayer
            src="https://www.myinstants.com/media/sounds/toasty_tfCWsU6.mp3"
            autoPlay
            controls
            className="music"
          />
        </div>
      ); // https://www.myinstants.com/media/sounds/certa-resposta.mp3
    }
  }

  imgFaustao() {
    const { showFaustao } = this.state;
    console.log('faustao foi chamada');

    if (showFaustao === true) {
      return (
        <div>
          <img src="https://dbriefing.com.br/blog/wp-content/uploads/2018/10/errou-faustao-gif.gif" alt="errou" className="errou" />
          <ReactAudioPlayer
            src="https://www.myinstants.com/media/sounds/errou_3.mp3"
            autoPlay
            controls
            className="music"
          />
        </div>
      );
    }
  }

  handleClick(e) {
    const { setAnswerVisibilityDispatch, verifyAnswer, stopTimerDispatch } = this.props;
    setAnswerVisibilityDispatch('show');
    stopTimerDispatch();
    verifyAnswer(e);
    this.toasty(e);
  }

  render() {
    const { alternative, correctAnswer, answerVisibility } = this.props;
    return (
      <div>
        <button
          type="button"
          className={ `${answerVisibility} btn-answer` }
          name={ alternative === correctAnswer ? CORRECT : WRONG }
          data-testid={ alternative === correctAnswer ? CORRECT : WRONG }
          onClick={ this.handleClick }
          disabled={ answerVisibility === 'show' }
        >
          {decode(alternative)}
        </button>
        {this.imgToasty()}
        {this.imgFaustao()}
      </div>
    );
  }
}

const mapStateToProps = ({ game }) => ({
  answerVisibility: game.answer_visibility,
});

const mapDispatchToProps = (dispatch) => ({
  setAnswerVisibilityDispatch: (visibility) => dispatch(setAnswerVisibility(visibility)),
  stopTimerDispatch: () => dispatch(stopTimer()),
});

Alternative.propTypes = {
  alternative: string,
  correctAnswer: string,
  answerVisibility: string,
  setAnswerVisibilityDispatch: func,
  verifyAnswer: func,
  stopTimerDispatch: func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Alternative);
