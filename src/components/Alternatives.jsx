import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Alternatives.css';
import ReactAudioPlayer from 'react-audio-player';

const CORRECT = 'correct-answer';
const INCORRECT = 'wrong-answer';

class Alternatives extends Component {
  constructor() {
    super();
    this.state = {
      mostraImg: false,
      showFaustao: false,
    };
    this.toasty = this.toasty.bind(this);
  }

  toasty(e) {
    const { setScore } = this.props;
    if (e.target.name === CORRECT) {
      setScore(true);
      return (
        this.setState({ mostraImg: true })
      );
    }
    setScore(false);
    return (this.setState({ showFaustao: true }));
  }

  imgToasty() {
    const { mostraImg } = this.state;
    if (mostraImg === true) {
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

  render() {
    const {
      question, aleatoryAnswers, correctAnswer, revelaBorda } = this.props;
    const { setRevelaBorda } = this.props;
    const questionReplaced = question.question
      .replace(/&quot;/gi, '"')
      .replace(/&#039;/gi, '\'')
      .replace(/&rsquo;/gi, '\'')
      .replace(/&eacute;/gi, 'é');

    return (
      <div>
        <p data-testid="question-category">{question.category}</p>
        <p data-testid="question-text">{questionReplaced}</p>
        <div className="answers">
          {aleatoryAnswers.map((answer, index) => (
            <button
              key={ index }
              className={ revelaBorda }
              type="button"
              name={ answer === correctAnswer ? CORRECT : INCORRECT }
              data-testid={ answer === correctAnswer ? CORRECT : INCORRECT }
              onClick={ (e) => {
                setRevelaBorda('show'); this.toasty(e);
              } }
              disabled={ !!revelaBorda }
            >
              { answer
                .replace(/&quot;/gi, '"')
                .replace(/&#039;/gi, '\'')
                .replace(/&rsquo;/gi, '\'')
                .replace(/&eacute;/gi, 'é')}
            </button>
          ))}
          {this.imgToasty()}
          {this.imgFaustao()}
        </div>
      </div>
    );
  }
}

Alternatives.propTypes = {
  question: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
  }).isRequired,
  aleatoryAnswers: PropTypes.arrayOf(PropTypes.string).isRequired,
  correctAnswer: PropTypes.string.isRequired,
  revelaBorda: PropTypes.string.isRequired,
  setRevelaBorda: PropTypes.func.isRequired,
  setScore: PropTypes.func.isRequired,
};

export default Alternatives;
