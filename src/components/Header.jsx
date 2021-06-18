import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { picture as pictureAction } from '../actions';
import * as api from '../services/Api';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gravatar: '',
    };
  }

  componentDidMount() {
    const { email, picture } = this.props;
    api.fetchGravatar(email).then((gravatar) => {
      picture(gravatar);
      this.setState({ gravatar });
    });
  }

  render() {
    const { name, score } = this.props;
    const { gravatar } = this.state;
    return (
      <nav className="navbar navbar-light bg-light, justify-content-around">
        <div className="container-fluid">
          <div className="navbar-img, nav-item">
            <img
              src={ gravatar }
              alt="User"
              data-testid="header-profile-picture"
              width="30"
              height="30"
            />
          </div>
          <div className="navbar-name, nav-item" href="/">
            <h3 data-testid="header-player-name">{ name }</h3>
          </div>
          <div className="navbar-score, nav-item" href="/">
            <h3 data-testid="header-score">{score}</h3>
          </div>
        </div>
      </nav>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  picture: (e) => dispatch(pictureAction(e)),
});

const mapStateToProps = (state) => ({
  name: state.tokenReducer.name,
});

Header.propTypes = {
  gravatar: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Header);
