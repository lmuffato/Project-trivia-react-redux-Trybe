import React, { Component } from 'react';
import ApiGetQuestions from '../services/ApiGetQuestions';
import Loading from '../components/Loading';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      questionsIndex: 0,
      loading: true,
    };
    this.getApi = this.getApi.bind(this);
  }

  componentDidMount() {
    this.getApi();
  }

  async getApi() {
    const questions = await ApiGetQuestions();
    this.setState({ questions, loading: true }, () => {
      this.setState({ loading: false });
    });
  }

  nextQuestion(NumberOfQuestions) {
    this.setState((prevState) => ({
      questionsIndex: (prevState.questionsIndex + 1) % NumberOfQuestions,
    }));
  }

  render() {
    // const token = localStorage.getItem('token');
    const { questions, questionsIndex, loading } = this.state;
    console.log(questions);
    const questionsFiltered = questions[questionsIndex];
    if (loading) {
      return <Loading />;
    }
    return (
      <div>
        <div>
          <span data-testid="question-category">{questionsFiltered.category}</span>
          <p data-testid="question-text">{questionsFiltered.question}</p>
        </div>

        <div>
          <ul>
            <li data-testid="correct-answer">{questionsFiltered.correctAnswer}</li>

            {questionsFiltered.incorrectAnswers.map((answer, index) => (
              <li
                key={ index }
                data-testid={ `wrong-answer-${index}` }
              >
                {answer}
              </li>
            )) }

          </ul>
        </div>

        <button
          type="button"
          onClick={ () => this.nextQuestion(questions.length) }
        >
          Next
        </button>
      </div>
    );
  }
}
