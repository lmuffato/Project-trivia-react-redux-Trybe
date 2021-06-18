import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login as loginAction } from '../actions';
import logo from '../trivia.png';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      disabled: true,
    };
    this.handleButton = this.handleButton.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async handleChange({ target }) {
    const { name, value } = target;
    await this.setState({
      [name]: value,
    });
    this.handleButton();
  }

  handleButton() {
    const { name, email } = this.state;
    if (name.length > 0 && email.length > 0) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  async handleClick() {
    const { name, email } = this.state;
    const { history, login } = this.props;
    const key = await fetch('https://opentdb.com/api_token.php?command=request');
    const token = await key.json();
    localStorage.setItem('token', token.token);
    const ranking = JSON.parse(localStorage.getItem('state'));
    if (ranking === null) {
      localStorage.setItem('state', JSON.stringify(
        {
          player: {
            index: 0,
            name,
            assertions: 0,
            gravatarEmail: email,
            score: 0,
          } },
      ));
    } else {
      const { index } = JSON.parse(localStorage.getItem('state')).player;
      localStorage.setItem('state', JSON.stringify(
        {
          player: {
            index: index + 1,
            name,
            assertions: 0,
            gravatarEmail: email,
            score: 0,
          } },
      ));
    } login(name);
    history.push('/trivia');
  }

  preventLink(event) {
    event.preventDefault();
  }

  loginInputs(param) {
    const { name, value, dataID, onChange } = param;
    return (
      <div className="form-group mb-3 row justify-content-center">
        <input
          className="form-control w-25 p-3 "
          name={ name }
          placeholder={ name }
          type="text"
          value={ value }
          data-testid={ dataID }
          onChange={ onChange }
        />
      </div>
    );
  }

  render() {
    const { name, email, disabled } = this.state;
    const nameInput = {
      name: 'name',
      placeH: 'name',
      value: name,
      dataID: 'input-player-name',
      onChange: (event) => this.handleChange(event) };
    const emailInput = {
      name: 'email',
      placeH: 'email',
      value: email,
      dataID: 'input-player-email',
      onChange: (event) => this.handleChange(event),
    };
    return (
      <div className="container d-grid gap-4">
        <img src={ logo } alt="imagem" className="img-fluid" />
        <form>
          { this.loginInputs(nameInput) }
          { this.loginInputs(emailInput) }
          <div className="input-group justify-content-center p-3">
            <button
              disabled={ disabled }
              data-testid="btn-play"
              type="button"
              onClick={ this.handleClick }
              className="btn btn-primary"
            >
              Jogar
            </button>
            <button
              data-testid="btn-settings"
              type="button"
              className="btn btn-outline-secondary"
            >
              <Link to="/settings"> Configurações </Link>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (e) => dispatch(loginAction(e)),
});

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.func).isRequired,
  login: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
