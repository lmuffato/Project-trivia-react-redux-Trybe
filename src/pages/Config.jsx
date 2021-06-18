import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { addCategory } from '../redux/actions';

class Config extends Component {
  constructor() {
    super();
    this.state = {
      api: [],
      category: '',
    };
    this.handleChange = this.handleChange.bind(this);
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

  render() {
    const { api, category } = this.state;
    const { categoryId } = this.props;
    const result = api.map(({ name, id }) => (
      <option
        name="option"
        value={ id }
        key={ id }
        onChange={ this.handleChange }
      >
        {name}
      </option>));
    const anyCategory = <option>Any Category</option>;
    return (
      <div>
        <h1 data-testid="settings-title">Settings</h1>
        <label htmlFor="categorys">
          Categorias
          <select
            id="categorys"
            name="category"
            onChange={ this.handleChange }
            value={ category }
          >
            {anyCategory}
            {result}
          </select>

        </label>
        <Link to="/">
          <button type="button" onClick={ () => categoryId(category) }>Enviar</button>
        </Link>
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
