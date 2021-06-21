import React from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';

function Question(props) {
  const isFetching = useSelector((state) => state.questions.isFetching);
  const { questions, index } = props;
  console.log('QUESTOES', questions);
  if (isFetching) return <p>Carregando</p>;
  return (
    <div className="question">
      <div><p data-testid="question-category">{ questions[index].category }</p></div>
      <div>
        <p data-testid="question-text">{ questions[index].question }</p>
      </div>
    </div>
  );
}

Question.propTypes = {
  questions: PropTypes.arrayOf().isRequired,
  index: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
});

export default connect(mapStateToProps, null)(Question);
