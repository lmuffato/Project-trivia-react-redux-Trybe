import React from 'react';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    return (
      <section>
        <Header />
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
