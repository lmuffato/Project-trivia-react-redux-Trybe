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
      <div className="container">
        <div className="row">
          <div className="col">
            <img
              src={ gravatar }
              alt="User"
              data-testid="header-profile-picture"
            />
          </div>
          <div className="col">
            <p data-testid="header-player-name">{ name }</p>
          </div>
          <div className="col">
            <p data-testid="header-score">{score}</p>
          </div>
        </div>
      </div>
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
