import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTokenThunk } from '../actions/actionUser';
import { getQuestionsThunk } from '../actions/actionQuestions';
import Question from '../components/Question';

class Game extends Component {
  async componentDidMount() {
    const { token, getQuestions, getToken, isLoadingUser } = this.props;
    if (token.response_code === 0 && !isLoadingUser) {
      await getQuestions(token.token);
    } else {
      await getToken();
      await getQuestions(token.token);
    }
  }

  render() {
    const {
      name, email, history, questions = [], isLoadingQuestion, isLoadingUser,
    } = this.props;
    if (!name || !email) history.push('/');
    if (isLoadingQuestion || isLoadingUser) return 'Carregando...';
    return (
      <div>
        <div>
          { Object.values(questions).length
            ? <Question idQuestion={ 0 } />
            : 'Não existem perguntas' }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  name: state.user.name,
  token: state.user.token,
  isLoadingUser: state.user.isLoading,
  questions: state.questions.questions.results,
  isLoadingQuestion: state.questions.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(getTokenThunk()),
  getQuestions: (token) => dispatch(getQuestionsThunk(token)),
});

Game.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
  token: PropTypes.oneOfType([PropTypes.object]).isRequired,
  getQuestions: PropTypes.func.isRequired,
  getToken: PropTypes.func.isRequired,
  isLoadingUser: PropTypes.bool.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object),
  isLoadingQuestion: PropTypes.bool.isRequired,
};

Game.defaultProps = {
  questions: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
