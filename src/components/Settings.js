import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';
import '../Settings.css';

import {
  getCategories as getCategoriesAction,
} from '../actions';

const difficulties = ['Easy', 'Medium', 'Hard'];
const types = ['Multiple Choice', 'True / False'];

class Settings extends Component {
  componentDidMount() {
    const { getCategories } = this.props;
    getCategories();
  }

  render() {
    const { categories } = this.props;
    console.log(this.props);
    return (
      <div className="settings-container">
        <h1 data-testid="settings-title">Configurações</h1>
        <Form.Group className="toggle-language-container">
          <Form.Label>Padrão (Inglês)</Form.Label>
          <div className="switch__container">
            <input
              id="switch-flat"
              className="switch switch--flat"
              type="checkbox"
            />
            <Form.Label htmlFor="switch-flat" />
          </div>
          <Form.Label>Português</Form.Label>
        </Form.Group>

        <Form.Control as="select" defaultValue="Categoria">
          <option disabled hidden>Categoria</option>
          {categories.map(({ name }, i) => (
            <option key={ i } value={ i }>{name}</option>
          ))}
        </Form.Control>
        <Form.Control as="select" defaultValue="Dificuldade">
          <option disabled hidden>Dificuldade</option>
          {difficulties.map((difficulty, i) => (
            <option key={ i } value={ i }>{difficulty}</option>
          ))}
        </Form.Control>
        <Form.Control as="select" defaultValue="Tipo">
          <option disabled hidden>Tipo</option>
          {types.map((type, i) => (
            <option key={ i } value={ i }>{type}</option>
          ))}
        </Form.Control>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.game.categories,
});

const mapDispatchToProps = (dispatch) => ({
  getCategories: () => dispatch(getCategoriesAction()),
});

Settings.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
