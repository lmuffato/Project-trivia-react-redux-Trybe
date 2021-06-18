// tela perguntas em si
// utiliza header component

// Requisição API

import React from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import Button from '../components/Button';
import Question from '../components/Question';
import Loading from '../components/Loading';

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
  }

  componentDidMount() {
    this.fetchApi();
  }

  // renderiza uma pergunta por vez do array de perguntas
  // controla o index do array de perguntas
  getNextQuestion() {
    const four = 4;
    const { index } = this.state;
    if (index < four) {
      this.setState({ index: index + 1 });
    }
    if (index === four) {
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

  render() {
    const { loading, index, questions, shouldRedirect } = this.state;

    if (loading) {
      return <Loading />;
    }

    if (shouldRedirect) {
      return <Redirect to="/feedback" />;
    }

    return (
      <>
        <Header />
        <div>
          <Question shouldStop={ this.shouldStop } quiz={ questions[index] } />
        </div>
        <Button
          dataTestid="btn-next"
          className="hide-button btnNext"
          onClick={ this.getNextQuestion }
        >
          Próxima
        </Button>
      </>
    );
  }
}

export default GamePage;

// Referências:
// função shuffleArr adaptada de: https://stackoverflow.com/questions/56501078/randomizing-quiz-answers-fetched-from-a-rest-api
// sobre splice: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
// função getNextQuestion adaptada de: https://www.freecodecamp.org/news/how-to-build-a-quiz-app-using-react/
