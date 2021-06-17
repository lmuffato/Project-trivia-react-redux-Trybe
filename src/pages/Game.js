import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './game.module.css';
import Header from '../components/Header';
import Questions from '../components/Questions';
import { getQuestionsThunk, getTokenThunk } from '../redux/actions';
import requestToken from '../services/requestToken';

class Game extends Component {
  componentDidMount() {
    this.getTokenQuestions();
  }

  async getTokenQuestions() {
    const { getQuestions } = this.props;
    const token = await requestToken();
    getQuestions(token);
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
  getQuestions: (token) => dispatch(getQuestionsThunk(token)),
  getToken: () => dispatch(getTokenThunk()),
});

const mapStateToProps = (state) => ({
  token: state.tokenReducer.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  // token: PropTypes.string.isRequired,
};
