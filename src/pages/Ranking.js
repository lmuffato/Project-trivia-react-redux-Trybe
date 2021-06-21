import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Ranking = () => (
  <div className="ranking">
    <header>
      <p>Ranking</p>
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
