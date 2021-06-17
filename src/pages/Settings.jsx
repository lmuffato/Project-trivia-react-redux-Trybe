import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      category: 9,
      difficulty: 'easy',
    };
  }

  handleChange({ target }) {
    const { id, value } = target;
    this.setState({ [id]: value });
  }

  renderSelectCategory() {
    const { categories } = this.props;
    const { category } = this.state;
    return (
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
    );
  }

  renderSelectDifficulty() {
    const { difficulty } = this.state;
    return (
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
    );
  }

  render() {
    return (
      <main>
        <h1 data-testid="settings-title">
          Página de configurações
        </h1>
        <section>
          <h3>
            {this.renderSelectCategory()}
          </h3>
          <h3>
            {this.renderSelectDifficulty()}
          </h3>
        </section>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.triviaReducer.categories,
});

Settings.propTypes = {
  categories: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Settings);
