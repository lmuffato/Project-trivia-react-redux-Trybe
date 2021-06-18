import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactAudioPlayer from 'react-audio-player';
import { Redirect } from 'react-router-dom';
import Question from '../components/Question';
import { getQuestionsThunk } from '../redux/actions/actions';
import Header from '../components/Header';

import './Jogo.css';
import Timer from '../components/Timer';
import NextQuestionBtn from '../components/NextQuestionBtn';

class Jogo extends Component {
  componentDidMount() {
    const { getQuestions } = this.props;

    getQuestions();
  }

  render() {
    const {
      answerVisibility,
      questions,
      currentQuestionIndex,
      redirectToFeedback,
    } = this.props;

    if (redirectToFeedback) {
      return <Redirect to="/feedback" />;
    }

    return (
      <div>
        <div>
          <Header />
          {/* <div className="timer">
            <Timer time={ time } setTimer={ this.setTimer } />
          </div> */}
        </div>
        <h1>Página do Jogo</h1>

        {questions[currentQuestionIndex]
        && <Question question={ questions[currentQuestionIndex] } />}

        { answerVisibility === 'show' && <NextQuestionBtn /> }
        <ReactAudioPlayer
          src="https://www.myinstants.com/media/sounds/perguntashowdomilhao.mp3"
          autoPlay
          controls
          className="music"
        />
      </div>
    );
  }
}

Jogo.propTypes = {
  email: PropTypes.string,
  nome: PropTypes.string,
  timeID: PropTypes.string,
  answerVisibility: PropTypes.string,
  redirectToFeedback: PropTypes.bool,
}.isRequired;

const mapStateToProps = ({ game, timer }) => ({
  timeID: timer.time,
  answerVisibility: game.answer_visibility,
  questions: game.questions,
  currentQuestionIndex: game.currentQuestionIndex,
  redirectToFeedback: game.redirectToFeedback,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (payload) => dispatch(getQuestionsThunk(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Jogo);
