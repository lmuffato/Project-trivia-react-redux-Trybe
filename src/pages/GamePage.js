import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import Header from '../components/Header/Header';
import Question from '../components/Question/Question';
import Loading from '../components/Loading';
import styles from './styles.module.css';

class GamePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      loading: true,
      index: 0,
      shouldRedirect: false,
    };

    this.fetchApi = this.fetchApi.bind(this);
    this.getNextQuestion = this.getNextQuestion.bind(this);
    this.renderTimer = this.renderTimer.bind(this);
  }

  componentDidMount() {
    this.fetchApi();
  }

  getNextQuestion() {
    const { index, questions } = this.state;
    if (index < questions.length - 1) {
      this.setState({ index: index + 1 });
    }
    if (index === questions.length - 1) {
      this.setState({ shouldRedirect: true });
    }
  }

  async fetchApi() {
    const getToken = localStorage.getItem('token');
    const endpoint = `https://opentdb.com/api.php?amount=5&token=${getToken}`;
    try {
      const request = await fetch(endpoint);
      const data = await request.json();
      console.log(data);
      const trivia = data.results;
      this.setState({
        loading: false,
        questions: trivia,
      });
    } catch (error) {
      console.log(error);
    }
  }

  renderTimer() {
    const { time } = this.state;
    return (<span>{ time }</span>);
  }

  render() {
    const { loading, index, questions, shouldRedirect } = this.state;

    if (loading) {
      return <Loading />;
    }

    if (shouldRedirect) {
      return <Redirect to="/feedback" />;
    }

    return (
      <div className={ styles.gamePageContent }>
        <Header />
        <div>
          <Question quiz={ questions[index] } getNextQuestion={ this.getNextQuestion } />
        </div>
      </div>
    );
  }
}

export default connect(null)(GamePage);

// Referências:
// função shuffleArr adaptada de: https://stackoverflow.com/questions/56501078/randomizing-quiz-answers-fetched-from-a-rest-api
// sobre splice: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
// função getNextQuestion adaptada de: https://www.freecodecamp.org/news/how-to-build-a-quiz-app-using-react/
