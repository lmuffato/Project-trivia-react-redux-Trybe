import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// const TableRanking = () => {

// };

const Ranking = () => (
  <div className="ranking">
    <header>
      <p data-testid="ranking-title">Ranking</p>
      <Link to="/"><span data-testid="btn-go-home">Início</span></Link>
    </header>
    <main>
      <p>MAIN</p>
    </main>
    <footer>
      <p>footer</p>
    </footer>
  </div>
);

Ranking.propTypes = {
  // props: PropTypes,
};

const mapStateToProps = () => ({

});

const mapDispatchToProps = () => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
