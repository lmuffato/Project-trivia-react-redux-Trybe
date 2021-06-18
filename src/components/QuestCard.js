import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MultipleTypeQuest from './MultipleTypeQuest';

class QuestCard extends Component {
  constructor() {
    super();
    this.state = {
      disabled: 'none',
    };
    this.getAnswer = this.getAnswer.bind(this);
    this.onNextClick = this.onNextClick.bind(this);
    this.resetButtons = this.resetButtons.bind(this);
  }

  onNextClick() {
    const { nextQuestion } = this.props;
    this.resetButtons();
    nextQuestion();
  }

  getAnswer(answer) {
    const { getUserAnswer } = this.props;
    this.setState({ disabled: 'block' });
    getUserAnswer(answer);
  }

  resetButtons() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
      button.classList.remove('incorrect-answer');
      button.classList.remove('correct-answer');
    });
    this.setState({ disabled: 'none' });
  }

  adjustQuestion(question) {
    // Source:
    // https://stackoverflow.com/questions/5957546/javascript-regex-replacing-quot
    const reg1 = question.replace(/&(lt|gt|quot);/g, '');
    const reg2 = reg1.replace(/&(lt|gt|#039);/g, '');
    const reg3 = reg2.replace(/&(lt|gt|Eacute);/g, 'é');

    return reg3;
  }

  render() {
    const { question } = this.props;
    const { disabled } = this.state;
    const adjustQuestion = this.adjustQuestion(question.question);
    const wrongAlternatives = question.incorrect_answers
      .map((incAns, index) => ({
        text: incAns,
        dataTest: `wrong-answer${index}`,
        class: 'wrong' }));
    const correctAlternative = {
      text: question.correct_answer,
      dataTest: 'correct-answer',
      class: 'correct',
    };
    const alternatives = {
      alt: [correctAlternative, ...wrongAlternatives],
      difficulty: question.difficulty,
    };
    return (
      <div>
        <p data-testid="question-category">{ question.category }</p>
        <h1 data-testid="question-text">{ adjustQuestion }</h1>
        <MultipleTypeQuest
          alternatives={ alternatives }
          getAnswer={ this.getAnswer }
          adjustAlternative={ this.adjustQuestion }
        />
        <button
          type="button"
          style={ { display: disabled } }
          data-testid="btn-next"
          onClick={ this.onNextClick }
        >
          Próxima Pergunta
        </button>
      </div>
    );
  }
}

QuestCard.propTypes = {
  question: PropTypes.arrayOf(PropTypes.object).isRequired,
  getUserAnswer: PropTypes.func.isRequired,
  nextQuestion: PropTypes.func.isRequired,
};

export default QuestCard;
