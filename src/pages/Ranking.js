import React, { Component } from 'react';
import { connect } from 'react-redux';

class Ranking extends Component {
  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking: </h1>
        <br />
        <h3>Melhores colocados (em ordem decrescente): </h3>
        <ul>
          <li>
            {}
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  
});

const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
