import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      category: 9,
      difficulty: 'easy',
      type: 'multiple',
    };
  }

  handleChange({ target: { id, value } }) {
    // const { id, value } = target;
    this.setState({ [id]: value });
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
                <option key={ e.id } value={ e.id }>{e.name}</option>
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
            <option value="easy">Fácil</option>
            <option value="medium">Médio</option>
            <option value="hard">Difícil</option>
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
            <option value="boolean">Verdadeiro ou Falso</option>
            <option value="multiple">Múltipla escolha</option>
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
        </main>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.triviaReducer.categories,
});

Settings.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default connect(mapStateToProps)(Settings);
