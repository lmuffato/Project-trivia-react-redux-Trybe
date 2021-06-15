import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MultipleTypeQuest extends Component {
  render() {
    const { alternatives } = this.props;
    return (
      <section>
        { alternatives
          .map((alternative, index) => (
            <button type="button" key={ index } data-testid={ alternative.dataTest }>
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
