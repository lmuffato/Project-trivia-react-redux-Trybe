import React, { Component } from 'react';
import Header from '../components/Header';

class NotFound extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="d-flex justify-content-center align-items-center">
          <div className="error" />
        </div>
        <form action="/">
          <button type="submit" className="btn-error">Voltar ao Início</button>
        </form>
      </div>
    );
  }
}

export default NotFound;
