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
      timeRemaining: 30,
    };
  }

  componentDidMount() {
    this.questionMaker();
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
      const state = JSON.parse(localStorage.getItem('state'));
      localStorage.setItem('state', JSON.stringify(
        {
          player: {
            index: state.player.index,
            name: state.player.name,
            assertions: state.player.assertions + 1,
            gravatarEmail: state.player.gravatarEmail,
            score: state.player.score + this.playerScore(),
          } },
      ));
    }
  }

  playerScore() {
    const { questionNum, questions, timeRemaining } = this.state;
    const { difficulty } = questions[questionNum];
    const magicNumber = 10;
    const diffScore = {
      easy: 1,
      medium: 2,
      hard: 3,
    };
    return (magicNumber + (timeRemaining * diffScore[difficulty]));
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
          className="ansrBtt"
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
        className="btn btn-primary"
        data-testid="btn-next"
        type="button"
        onClick={ () => {
          const { questionNum, questions } = this.state;
          const { history } = this.props;
          const btns = document.getElementsByTagName('button');
          for (let index = 0; index < btns.length; index += 1) {
            btns[index].className = 'ansrBtt';
          }
          if (questionNum === questions.length - 1) {
            history.push('/feedback');
          }
          this.setState({
            questionNum: questionNum + 1,
            disabled: false,
            next: false,
            timeRemaining: 30,
          });
        } }
      >
        Próxima
      </button>
    );
  }

  Timer() {
    const oneSecond = 1000;
    const { timeRemaining, disabled } = this.state;
    if (timeRemaining !== 0 && disabled === false) {
      setTimeout(() => {
        this.setState({
          timeRemaining: timeRemaining - 1,
        });
      },
      oneSecond);
    } if (timeRemaining === 0 && disabled === false) {
      const btns = document.getElementsByTagName('button');
      for (let index = 0; index < btns.length; index += 1) {
        btns[index].className = btns[index].id;
      }
      this.setState({
        next: true,
        disabled: true,
      });
    }

    return (
      <p>{timeRemaining}</p>
    );
  }

  render() {
    const { score } = JSON.parse(localStorage.getItem('state')).player;
    const { loading } = this.state;
    if (loading) return (<div>loading</div>);
    const { questions, questionNum, next } = this.state;
    const { category, question } = questions[questionNum];
    return (
      <div className="container">
        <div className="card w-80 border-secondary mb-3">
          <div className="card-header">
            <Header score={ score } />
          </div>
          {this.Timer()}
          <h2 className="card-title" data-testid="question-category">
            {category}
          </h2>
          <h3 data-testid="question-text">
            {question}
          </h3>
          {this.answerButtons()}
          <br />
          {
            next
              ? this.nextButton()
              : <span> </span>
          }
        </div>
      </div>
    );
  }
}

Trivia.propTypes = {
  history: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default Trivia;
