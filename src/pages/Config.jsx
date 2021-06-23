import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { addOptionsConfig } from '../redux/actions';
import '../styles/config.css';

const arrayDifficults = ['Any Difficult', 'Easy', 'Medium', 'Hard'];
const arrayType = ['Any type', 'boolean', 'multiple'];

class Config extends Component {
  constructor() {
    super();
    this.state = {
      api: [],
      category: '',
      difficult: '',
      type: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.dificcultSettings = this.dificcultSettings.bind(this);
  }

  componentDidMount() {
    this.handleApi();
  }

  async handleApi() {
    const response = await fetch('https://opentdb.com/api_category.php');
    const date = await response.json();
    this.setState(({
      api: date.trivia_categories,
    }));
  }

  handleChange({ target: { value, name } }) {
    this.setState(({
      [name]: value.toLowerCase(),
    }));
  }

  dificcultSettings() {
    const { difficult } = this.state;
    return (
      <label className="labels-setting" htmlFor="difficult">
        Dificuldade:
        <select
          className="selectConfig"
          id="difficult"
          name="difficult"
          onChange={ this.handleChange }
          value={ difficult }
        >
          {arrayDifficults
            .map((element, index) => <option key={ index }>{element}</option>)}
        </select>
      </label>);
  }

  typeSettings() {
    const { type } = this.state;
    return (
      <label className="labels-setting" htmlFor="type">
        Tipo de pergunta:
        <select
          className="selectConfig"
          id="type"
          name="type"
          onChange={ this.handleChange }
          value={ type }
        >
          {arrayType
            .map((element, index) => <option key={ index }>{element}</option>)}
        </select>
      </label>);
  }

  render() {
    const { api, category, difficult, type } = this.state;
    const obj = { category, difficult, type };
    const { objConfig } = this.props;
    const result = api.map(({ name, id }) => (
      <option
        name="option"
        value={ id }
        key={ id }
        onChange={ this.handleChange }
      >
        {name}
      </option>));
    const anyCategory = <option className="optionConfig">Any Category</option>;
    return (
      <main className="fatherSettings">
        <h1 className="titleSettings" data-testid="settings-title">Configurações</h1>
        <section className="settings-container">
          <label className="labels-setting" htmlFor="categorys">
            Categorias:
            <select
              className="selectConfig"
              id="categorys"
              name="category"
              onChange={ this.handleChange }
              value={ category }
            >
              {anyCategory}
              {result}
            </select>
          </label>
          {this.dificcultSettings()}
          {this.typeSettings()}
        </section>
        <button
          className="buttonSettingsSend"
          type="button"
          onClick={ () => objConfig(obj) }
        >

          <Link className="linkConfig" to="/">
            Salvar configurações
          </Link>
        </button>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  objConfig: (obj) => dispatch(addOptionsConfig(obj)),
});

Config.propTypes = {
  objConfig: PropTypes.shape({
    category: PropTypes.string,
    difficult: PropTypes.string,
    amount: PropTypes.string,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Config);
