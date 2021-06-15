import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import * as api from '../services/datasApi';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quests: [],
      indice: 0,
      loading: true,
    };
    this.requestApi = this.requestApi.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
  }

  componentDidMount() {
    this.requestApi();
  }

  async requestApi() {
    const token = JSON.parse(localStorage.getItem('token'));
    const res = await api.fetchQuest(token);
    this.setState({
      quests: res.results,
      loading: false,
    });
    console.log(res);
  }

  renderQuestions() {
    const { quests, indice } = this.state;
    const crrQuestion = quests[indice];
    const altenativesOld = crrQuestion.incorrect_answers
      .concat(crrQuestion.correct_answer);
    const numMagic = 0.5;
    const alternatives = altenativesOld.sort(() => Math.random() - numMagic);

    return (
      <div>
        <Header />
        <p data-testid="question-category">
          {crrQuestion.category}
        </p>
        <p data-testid="question-text">
          {crrQuestion.question}
        </p>
        {alternatives.map((alternative, index) => (
          <button
            type="button"
            key={ Math.random() }
            onClick={
              () => this.setState((prevState) => ({ indice: prevState.indice + 1 }))
            }
          >
            {alternative === crrQuestion.correct_answer ? (
              <p data-testid="correct-answer">{alternative}</p>
            ) : (
              <p
                data-testid={ `wrong-answer-${index}` }
                key={ Math.random() }
              >
                {alternative}
              </p>
            )}
          </button>
        ))}
        <Link to="/">
          <button type="button">voltar</button>
        </Link>
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      loading ? <p>Loading...</p> : this.renderQuestions()
    );
  }
}

export default Game;
