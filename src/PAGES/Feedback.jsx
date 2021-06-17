import React from 'react';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    /*     const { correctAnswers } = this.props;
    const message = '';
    if (correctAnswers < 3) {

    } else {

    } */
    return (
      <div>
        <Header />
        {/*         <p data-testid="feedback-text">{ message }</p>
        <div>
          <p>Placar final</p>
          <p>Total de pontos: $</p>
          <p data-testid="feedback-total-score">{totalScore}</p>
          <p>Total de acertos:</p>
          <p data-testid="feedback-total-question">{correctAnswers}</p>
        </div> */}
      </div>
    );
  }
}

/* const mapStateToProps = (state) => ({
  // correctAnswers: state.Player.questions,
}); */

export default Feedback;
