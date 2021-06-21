import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Dropdown from 'react-dropdown';
import { getCategories } from '../services/api';
import { setSettings } from '../actions';
import Input from '../components/input/Input';
import 'react-dropdown/style.css';
import Button from '../components/button/Button';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: undefined,
      category: 9,
      difficulty: 'easy',
      quantity: 5,
      save: false,
    };

    this.loadCategories = this.loadCategories.bind(this);
    this.getOptionsCategories = this.getOptionsCategories.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleChangeDifficulty = this.handleChangeDifficulty.bind(this);
    this.save = this.save.bind(this);
  }

  componentDidMount() {
    this.loadCategories();
  }

  getSelectCategories() {
    return (
      <Dropdown
        name="category"
        onChange={ this.handleChangeCategory }
        options={ this.getOptionsCategories() }
        placeholder="Selecione uma categoria"
      />
    );
  }

  getOptionsCategories() {
    const { categories } = this.state;
    return categories
      .map((category) => ({ value: category.id, label: category.name }));
  }

  getOptionsDifficulty() {
    return ['easy', 'medium', 'hard'];
  }

  save() {
    const { category, quantity, difficulty } = this.state;
    const settings = {
      category, difficulty, quantity,
    };

    const { toSettings } = this.props;
    toSettings(settings);

    this.setState({ save: true });
  }

  loadCategories() {
    getCategories().then((response) => {
      this.setState({ categories: response });
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleChangeCategory(option) {
    this.setState({ category: option.value });
  }

  handleChangeDifficulty(option) {
    this.setState({ difficulty: option.value });
  }

  render() {
    const { categories, save } = this.state;

    if (save) {
      return <Redirect to="/" />;
    }

    return (
      <section className="container login-container">
        <h1 data-testid="settings-title"> Configurações </h1>
        <form>
          <Input name="quantity" handleChange={ this.handleChange } />
          { categories && this.getSelectCategories() }
          <Dropdown
            name="difficulty"
            onChange={ this.handleChangeDifficulty }
            options={ this.getOptionsDifficulty() }
            placeholder="Selecione uma dificuldade"
          />
          <Button
            text="Salvar"
            type="button"
            handleClick={ this.save }
            classList="button-primary"
            key="Salvar-Settings"
          />
        </form>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  toSettings: (settings) => dispatch(setSettings(settings)),
});

Settings.propTypes = {
  toSettings: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Settings);
