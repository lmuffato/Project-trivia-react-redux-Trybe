import React from 'react';

class Trivia extends React.Component {
  constructor() {
    super();
    this.answerButtons = this.answerButtons.bind(this);
    this.state = {
      questions: [],
      questionNum: 0,
      loading: true,
    };
  }

  componentDidMount() {
    this.questionMaker();
  }

  async questionMaker() {
    const token = await localStorage.getItem('token');
    const key = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const questions = await key.json();
    console.log(questions);
    this.setState({
      questions: questions.results,
      loading: false,
    });
  }

  answerButtons() {
    const shuffIndex = 0.5;
    const sliceIndex = -1;
    const { questions, questionNum } = this.state;
    const { correct_answer: corAns, incorrect_answers: incAns } = questions[questionNum];
    const answers = [corAns, ...incAns];
    const ind = [];
    answers.map((answer, index) => ind.push(`${answer} ${index}`));
    const shuffle = ind.sort(() => Math.random() - shuffIndex);
    return (shuffle.map((answ, i) => {
      const index = answ.slice(sliceIndex);
      const answer = answ.slice(0, sliceIndex);
      let testId = 'correct-answer';
      if (index !== '0') {
        testId = `wrong-answer-${index - 1}`;
      }
      return (
        <button type="button" key={ i } data-testid={ testId }>
          { answer }
        </button>
      );
    }));
  }

  render() {
    const { loading } = this.state;
    if (loading) return (<div>loading</div>);
    const { questions, questionNum } = this.state;
    const { category, question } = questions[questionNum];
    return (
      <div>
        <p data-testid="question-category">
          {category}
        </p>
        <p data-testid="question-text">
          {question}
        </p>
        {this.answerButtons()}
      </div>
    );
  }
}

export default Trivia;
