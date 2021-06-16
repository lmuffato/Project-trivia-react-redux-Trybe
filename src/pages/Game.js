import React, { Component } from 'react';
import { connect } from 'react-redux';
// import ApiGetQuestions from '../services/ApiGetQuestions';
// import Loading from '../components/Loading';
import styles from './game.module.css';
import Header from '../components/Header';
import Questions from '../components/Questions';
import { getQuestionsThunk } from '../redux/actions';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      questionsIndex: 0,
      loading: true,
    };
    // this.getApi = this.getApi.bind(this);
  }

  componentDidMount() {
    // this.getApi();
    const { getQuestions } = this.props;
    getQuestions();
  }

  // async getApi() {
  //   const questions = await ApiGetQuestions();
  //   this.setState({ questions, loading: true }, () => {
  //     this.setState({ loading: false });
  //   });
  // }

  nextQuestion(NumberOfQuestions) {
    this.setState((prevState) => ({
      questionsIndex: (prevState.questionsIndex + 1) % NumberOfQuestions,
    }));
  }

  render() {
    // const token = localStorage.getItem('token');
    // const { questions, questionsIndex, loading } = this.state;
    // const { questionsTest, loadingTest } = this.props;
    // console.log(questionsTest, loadingTest);
    // const questionsFiltered = questions[questionsIndex];
    // if (loading) {
    //   return <Loading />;
    // }
    return (
      <>
        <Header />
        <div className={ styles.question__container }>
          {/* <Questions questionsFiltered={ questionsFiltered } /> */}
          <Questions />
          {/* <button
            type="button"
            onClick={ () => this.nextQuestion(questions.length) }
            className={ styles.question__button }
          >
            Next
          </button> */}

        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => dispatch(getQuestionsThunk()),
});

export default connect(null, mapDispatchToProps)(Game);
