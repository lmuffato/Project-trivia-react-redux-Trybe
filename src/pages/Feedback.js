import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export const Feedback = () => (
  <div className="feedback">
    <header>
      <h1>Feedback</h1>
    </header>
    <main>
      <div>
        <Link to="/ranking">
          <button
            type="button"
          >
            Ranking
          </button>
        </Link>
        <Link to="/">
          <button
            type="button"
          >
            Jogar Novamente
          </button>
        </Link>
      </div>
    </main>
    <footer>
      <p>Footer</p>
    </footer>
  </div>
);

Feedback.propTypes = {
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
