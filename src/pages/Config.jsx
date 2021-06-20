import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { addCategory } from '../redux/actions';
import '../styles/config.css';

class Config extends Component {
  constructor() {
    super();
    this.state = {
      api: [],
      category: '',
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
      [name]: value,
    }));
  }

  dificcultSettings() {
    return (
      <label className="labelDificcult" htmlFor="dificcult">
        Dificuldade:
        <select
          className="selectConfig"
          id="dificcult"
          name="category"
          onChange={ this.handleChange }
        >
          <option className="optionConfig">oi</option>
        </select>
      </label>);
  }

  render() {
    const { api, category } = this.state;
    const { categoryId } = this.props;
    const result = api.map(({ name, id }) => (
      <option
        className="optionConfig"
        name="option"
        value={ id }
        key={ id }
        onChange={ this.handleChange }
      >
        {name}
      </option>));
    const anyCategory = <option className="optionConfig">Any Category</option>;
    return (
      <div className="fatherSettings">
        <h1 className="titleSettings" data-testid="settings-title">Configurações</h1>
        <div className="labelsConfig">
          <label className="labelCategorys" htmlFor="categorys">
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
        </div>
        <button
          className="buttonSettingsSend"
          type="button"
          onClick={ () => categoryId(category) }
        >

          <Link to="/">
            Enviar
          </Link>
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  categoryId: (id) => dispatch(addCategory(id)),
});

Config.propTypes = {
  categoryId: PropTypes.string.isRequired,
};

export default connect(null, mapDispatchToProps)(Config);
