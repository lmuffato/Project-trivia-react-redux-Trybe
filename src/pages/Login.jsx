import React, { Component } from 'react';
import { object } from 'prop-types';
import LoginForm from '../components/LoginForm';

class Login extends Component {
  render() {
    const { history } = this.props;
    return (
      <div className="main-content">
        <LoginForm history={ history } />
      </div>
    );
  }
}

Login.propTypes = {
  history: object,
}.isRequired;

export default Login;
