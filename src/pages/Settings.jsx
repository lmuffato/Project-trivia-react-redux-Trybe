import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { filters } from '../actions';

class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      category: 9,
      difficulty: 'easy',
      type: 'multiple',
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { id, value } }) {
    this.setState({ [id]: value });
  }

  handleClick() {
    const { sendFilters, history } = this.props;
    const { category, difficulty, type } = this.state;
    const urlComplement = [`${category}${difficulty}${type}`];
    const newUrl = urlComplement.join(' ');
    sendFilters(newUrl);
    history.push('/');
  }

  renderSelectCategory() {
    const { categories } = this.props;
    const { category } = this.state;
    return (
      <h4>
        <label htmlFor="category">
          Categoria
          <select
            id="category"
            value={ category }
            onChange={ (e) => this.handleChange(e) }
          >
            {
              categories.map((e) => (
                <option key={ e.id } value={ `&category=${e.id}` }>{e.name}</option>
              ))
            }
          </select>
        </label>
      </h4>
    );
  }

  renderSelectDifficulty() {
    const { difficulty } = this.state;
    return (
      <h4>
        <label htmlFor="difficulty">
          Dificuldade
          <select
            id="difficulty"
            value={ difficulty }
            onChange={ (e) => this.handleChange(e) }
          >
            <option value="&difficulty=easy">Fácil</option>
            <option value="&difficulty=medium">Médio</option>
            <option value="&difficulty=hard">Difícil</option>
          </select>
        </label>
      </h4>
    );
  }

  renderSelectType() {
    const { type } = this.state;
    return (
      <h4>
        <label htmlFor="type">
          Tipo de pergunta
          <select
            id="type"
            value={ type }
            onChange={ (e) => this.handleChange(e) }
          >
            <option value="&type=boolean">Verdadeiro ou Falso</option>
            <option value="&type=multiple">Múltipla escolha</option>
          </select>
        </label>
      </h4>
    );
  }

  render() {
    return (
      <>
        <header>
          <h1 data-testid="settings-title">
            Página de configurações
          </h1>
        </header>
        <main>
          <section>
            {this.renderSelectCategory()}
            {this.renderSelectDifficulty()}
            {this.renderSelectType()}
          </section>
          <button
            type="button"
            onClick={ this.handleClick }
          >
            Jogar!
          </button>
        </main>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.triviaReducer.categories,
});

const mapDispatchToProps = (dispatch) => ({
  sendFilters: (obj) => dispatch(filters(obj)),
});

Settings.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
