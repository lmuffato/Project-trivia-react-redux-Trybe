import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './game.module.css';
import Header from '../components/Header';
import Questions from '../components/Questions';
import { getQuestionsThunk } from '../redux/actions';

class Game extends Component {
  componentDidMount() {
    const { getQuestions } = this.props;
    getQuestions();
  }

  render() {
    return (
      <>
        <Header />
        <div className={ styles.question__container }>
          <Questions />
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => dispatch(getQuestionsThunk()),
});

export default connect(null, mapDispatchToProps)(Game);

Game.propTypes = {
  getQuestions: PropTypes.func.isRequired,
};
