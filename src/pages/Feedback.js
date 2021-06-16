import React from 'react';
// import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  constructor() {
    super();
    this.scoreMenssage = this.scoreMenssage.bind(this);
    this.totalQuestions = this.totalQuestions.bind(this);
  }

  // scoreMenssage() {
  //   const { score } = this.props;
  //   const minimumScore = 30;
  //   if (score < minimumScore) {
  //     return 'Podia ser melhor...';
  //   }
  //   return 'Mandou bem!';
  // }

  // totalQuestions() {
  //   const { score } = this.props;
  //   const divider = 10;
  //   return score / divider;
  // }

  render() {
    // const { score } = this.pros;
    return (
      <section>
        <Header />
        {/* <h1 data-testid="feedback-text">
          {this.scoreMenssage()}
        </h1>
        <h2 data-testid="feedback-total-question">
          Você acertou
          { this.totalQuestions }
          questões!
        </h2>
        <h2 data-testid="feedback-total-score">
          Um total de
          { score }
          pontos
        </h2> */}
      </section>
    );
  }
}

// const mapStateToProps = (state) => ({
//   name: state.playerFunction.player.name,
//   score: state.playerFunction.player.score,
// });

// export default connect(mapStateToProps, null)(Feedback);

export default Feedback;
