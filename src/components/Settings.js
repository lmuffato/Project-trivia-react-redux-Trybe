import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';
import '../Settings.css';

import {
  getCategories as getCategoriesAction,
  updateUrl as updateUrlAction,
} from '../actions';

const difficulties = ['Easy', 'Medium', 'Hard'];
const types = ['Multiple Choice', 'True / False'];

class Settings extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.renderCategorySelect = this.renderCategorySelect.bind(this);
    this.renderDifficultySelect = this.renderDifficultySelect.bind(this);
    this.renderTypeSelect = this.renderTypeSelect.bind(this);
  }

  componentDidMount() {
    const { getCategories } = this.props;
    getCategories();
  }

  handleChange({ target: { name, value } }) {
    const { updateUrl } = this.props;
    updateUrl(`&${name}=${value}`);
  }

  renderCategorySelect() {
    const { categories } = this.props;

    return (
      <Form.Control
        name="category"
        as="select"
        defaultValue="Categoria"
        onChange={ this.handleChange }
      >
        <option disabled hidden>
          Categoria
        </option>
        {categories.map(({ name, id }) => (
          <option key={ id } value={ id }>
            {name}
          </option>
        ))}
      </Form.Control>
    );
  }

  renderDifficultySelect() {
    return (
      <Form.Control
        as="select"
        name="difficulty"
        defaultValue="Dificuldade"
        onChange={ this.handleChange }
      >
        <option disabled hidden>
          Dificuldade
        </option>
        {difficulties.map((difficulty, i) => (
          <option key={ i } value={ difficulty.toLowerCase() }>
            {difficulty}
          </option>
        ))}
      </Form.Control>
    );
  }

  renderTypeSelect() {
    return (
      <Form.Control
        as="select"
        name="type"
        defaultValue="Tipo"
        onChange={ this.handleChange }
      >
        <option disabled hidden>
          Tipo
        </option>
        {types.map((type, i) => (
          <option
            key={ i }
            value={ type === 'True / False' ? 'boolean' : 'multiple' }
          >
            {type}
          </option>
        ))}
      </Form.Control>
    );
  }

  render() {
    return (
      <div className="settings-container">
        <h1 data-testid="settings-title">Configurações</h1>
        <Form.Group className="toggle-language-container">
          <Form.Label>Inglês</Form.Label>
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
        {this.renderCategorySelect()}
        {this.renderDifficultySelect()}
        {this.renderTypeSelect()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.game.categories,
});

const mapDispatchToProps = (dispatch) => ({
  getCategories: () => dispatch(getCategoriesAction()),
  updateUrl: (part) => dispatch(updateUrlAction(part)),
});

Settings.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  getCategories: PropTypes.func,
  updateUrl: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
