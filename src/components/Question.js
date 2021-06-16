import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Question(props) {
  const { questions, index } = props;
  console.log('QUESTOES', questions);
  return (
    <div className="question">
      <div><p data-testid="question-category">{ questions[index].category }</p></div>
    </div>
  );
}

Question.propTypes = {
  questions: PropTypes.arrayOf().isRequired,
  index: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.user.questions,
});

// const mapDispatchToProps = (dispatch) => ({

// });

export default connect(mapStateToProps, null)(Question);
