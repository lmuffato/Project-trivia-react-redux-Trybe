import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './MultipleTypeQuest.css';

class MultipleTypeQuest extends Component {
  constructor() {
    super();
    this.addAnswerBorder = this.addAnswerBorder.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  addAnswerBorder() {
    const btnAlternative = document.querySelectorAll('button');
    btnAlternative[0].classList.add('correct-answer');

    for (let index = 1; index < btnAlternative.length; index += 1) {
      btnAlternative[index].classList.add('incorrect-answer');
    }
  }

  handleClick(e) {
    const { getAnswer } = this.props;
    this.addAnswerBorder();
    getAnswer({
      validation: e.target.className,
      questionDifficulty: e.target.parentNode.className,
    });
  }

  render() {
    const { alternatives } = this.props;
    return (
      <section className={ alternatives.difficulty }>
        { alternatives.alt
          .map((alternative, index) => (
            <button
              type="button"
              onClick={ this.handleClick }
              key={ index }
              data-testid={ alternative.dataTest }
              disabled={ false }
            >
              { alternative.text }
            </button>)) }
      </section>
    );
  }
}

MultipleTypeQuest.propTypes = {
  alternatives: PropTypes.shape({
    difficulty: PropTypes.string,
    alt: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  getAnswer: PropTypes.func.isRequired,
};

export default MultipleTypeQuest;
