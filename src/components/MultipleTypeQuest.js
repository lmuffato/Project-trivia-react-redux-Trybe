import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './MultipleTypeQuest.css';

class MultipleTypeQuest extends Component {
  handleClick() {
    const btnAlternative = document.querySelectorAll('button');
    btnAlternative[0].classList.add('correct-answer');

    for (let index = 1; index < btnAlternative.length; index += 1) {
      btnAlternative[index].classList.add('incorrect-answer');
    }
  }

  render() {
    const { alternatives } = this.props;
    return (
      <section>
        { alternatives
          .map((alternative, index) => (
            <button
              type="button"
              onClick={ this.handleClick }
              key={ index }
              data-testid={ alternative.dataTest }
            >
              { alternative.text }
            </button>)) }
      </section>
    );
  }
}

MultipleTypeQuest.propTypes = {
  alternatives: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MultipleTypeQuest;
