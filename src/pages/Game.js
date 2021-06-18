import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Questions from '../components/Questions';
import { getQuestionsThunk, getTokenThunk } from '../redux/actions';
import requestToken from '../services/requestToken';
import Footer from './Footer';
import styles from './game.module.css';

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
    const { history } = this.props;
    return (
      <main className={ styles.game__main }>
        <Header />
        <Questions history={ history } />
        <Footer />
      </main>
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
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  // token: PropTypes.string.isRequired,
};
