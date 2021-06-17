import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/gameHeader';
import Questions from '../components/Questions';
import { getQuestionsThunk } from '../redux/actions';

class Game extends Component {
  componentDidMount() {
    const { token, fetchQuestions } = this.props;
    fetchQuestions(token);
  }

  render() {
    return (
      <div>
        <Header />
        <Questions />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.login.token,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: (value) => dispatch(getQuestionsThunk(value)),
});

Game.propTypes = {
  token: PropTypes.string.isRequired,
  fetchQuestions: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
