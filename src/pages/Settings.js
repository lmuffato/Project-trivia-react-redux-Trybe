import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Proptypes from 'prop-types';
import { changeConfigs } from '../redux/actions';

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      categories: '',
      category: '',
      amount: 5,
      type: '',
      difficulty: '',
      time: 30,
      redirect: false,
    };
    this.fetchCategories = this.fetchCategories.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderTime = this.renderTime.bind(this);
    this.sendConfigs = this.sendConfigs.bind(this);
  }

  componentDidMount() {
    this.fetchCategories();
  }

  handleChange({ target }) {
    const { value, id } = target;
    if ((id === 'category' || id === 'type' || id === 'difficulty') && value !== '') {
      this.setState({
        [id]: `&${id}=${value}`,
      });
    } else {
      this.setState({
        [id]: value,
      });
    }
  }

  async fetchCategories() {
    const categories = await (await fetch('https://opentdb.com/api_category.php')).json();
    this.setState({
      categories,
    });
  }

  sendConfigs(event) {
    event.preventDefault();
    const { category, amount, type, difficulty, time } = this.state;
    const { updateConfigs } = this.props;

    const configs = {
      category,
      amount,
      type,
      difficulty,
      time,
    };
    updateConfigs(configs);
    this.setState({
      redirect: true,
    });
  }

  renderTime() {
    return (
      <label htmlFor="time">
        Tempo para resposta
        <input
          type="number"
          min="30"
          max="90"
          id="time"
          onChange={ this.handleChange }
        />
      </label>);
  }

  render() {
    const { categories, redirect } = this.state;
    return (
      <form onSubmit={ this.sendConfigs }>
        <h1 data-testid="settings-title">Configurações de Jogo</h1>
        <label htmlFor="category">
          Categoria
          <select id="category" onChange={ this.handleChange }>
            <option value="">Todos</option>
            {(categories)
              ? categories.trivia_categories.map((categorie, key) => (
                <option key={ key } value={ categorie.id }>
                  {categorie.name}
                </option>))
              : 'Loading...'}
          </select>
        </label>
        <label htmlFor="difficulty">
          Dificuldade
          <select id="difficulty" onChange={ this.handleChange }>
            <option value="">Todos</option>
            <option value="easy">Fácil</option>
            <option value="medium">Médio</option>
            <option value="hard">Difícil</option>
          </select>
        </label>
        <label htmlFor="type">
          Tipo de questão
          <select id="type" onChange={ this.handleChange }>
            <option value="">Ambas</option>
            <option value="boolean">Verdadeiro ou Falso</option>
            <option value="multiple">Múltipla escolha</option>
          </select>
        </label>
        <label htmlFor="amount">
          Quantidade de perguntas
          <input
            type="number"
            min="5"
            max="30"
            id="amount"
            onChange={ this.handleChange }
          />
        </label>
        {this.renderTime()}
        <button type="submit"> Alterar </button>
        {redirect && <Redirect to="/" /> }
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateConfigs: (configs) => (dispatch(changeConfigs(configs))),
});

Settings.propTypes = {
  updateConfigs: Proptypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Settings);
