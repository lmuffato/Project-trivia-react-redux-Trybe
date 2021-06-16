import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Trivia extends React.Component {
  constructor() {
    super();
    this.answerButtons = this.answerButtons.bind(this);
    this.state = {
      questions: [],
      questionNum: 0,
      loading: true,
      disabled: false,
      respostas: [],
      next: false,
    };
  }

  componentDidMount() {
    this.questionMaker();
    localStorage.setItem('player', JSON.stringify({ assertions: 0 }));
  }

  async questionMaker() {
    const token = await localStorage.getItem('token');
    const key = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const questions = await key.json();
    const answerss = [];
    questions.results.map((q) => {
      const shuffIndex = 0.5;
      const { correct_answer: corAns, incorrect_answers: incAns } = q;
      const answers = [corAns, ...incAns];
      const ind = [];
      answers.map((answer, index) => ind.push(`${answer} ${index}`));
      const shuffle = ind.sort(() => Math.random() - shuffIndex);
      answerss.push(shuffle);
      return '';
    });
    this.setState({
      respostas: answerss,
      questions: questions.results,
      loading: false,
    });
  }

  handleClick(event) {
    this.setState({
      disabled: true,
      next: true,
    });
    const btns = document.getElementsByTagName('button');
    for (let index = 0; index < btns.length; index += 1) {
      btns[index].className = btns[index].id;
    }
    if (event.target.id === 'correct-answer') {
      const prevAssertions = JSON.parse(localStorage.getItem('player')).assertions;
      localStorage.setItem('player', JSON.stringify({ assertions: prevAssertions + 1 }));
    }
  }

  answerButtons() {
    const sliceIndex = -1;
    const { disabled, respostas, questionNum } = this.state;
    return (respostas[questionNum].map((answ, i) => {
      const index = answ.slice(sliceIndex);
      const answer = answ.slice(0, sliceIndex);
      let testId = 'correct-answer';
      if (index !== '0') { testId = `wrong-answer-${index - 1}`; }
      return (
        <button
          type="button"
          key={ i }
          id={ testId }
          data-testid={ testId }
          disabled={ disabled }
          onClick={ (event) => this.handleClick(event) }
        >
          { answer }
        </button>
      );
    }));
  }

  nextButton() {
    return (
      <button
        data-testid="btn-next"
        type="button"
        onClick={ () => {
          const { questionNum, questions } = this.state;
          const { history } = this.props;
          const btns = document.getElementsByTagName('button');
          for (let index = 0; index < btns.length; index += 1) {
            btns[index].className = '';
          }
          if (questionNum === questions.length - 1) {
            history.push('/feedback');
          }
          this.setState({
            questionNum: questionNum + 1,
            disabled: false,
            next: false,
          });
        } }
      >
        Próxima
      </button>
    );
  }

  render() {
    const { loading } = this.state;
    if (loading) return (<div>loading</div>);
    const { questions, questionNum, next } = this.state;
    const { category, question } = questions[questionNum];
    return (
      <div>
        <Header />
        <p data-testid="question-category">
          {category}
        </p>
        <p data-testid="question-text">
          {question}
        </p>
        {this.answerButtons()}
        <br />
        {
          next
            ? this.nextButton()
            : <span> </span>
        }

      </div>
    );
  }
}

Trivia.propTypes = {
  history: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default Trivia;
