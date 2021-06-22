import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setStateInReduxAction, fetchCategoriesThunk } from '../redux/action';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: 5,
      category: 'any',
      difficulty: 'any',
      type: 'any',
      enconde: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { fetchCategories } = this.props;
    fetchCategories();
  }

  varToString(objAttribute) {
    if (typeof objAttribute !== 'object') return 'objAttribute should be object';
    return Object.keys(objAttribute)[0];
  }

  handleChange({ target: { name, type, value, checked } }) {
    const { setStateInRedux } = this.props;
    const finalValue = type === 'checkbox' ? checked : value;
    this.setState({
      [name]: finalValue,
    }, () => setStateInRedux(this.state));
    // setStateInRedux(this.state);
  }

  inputAmount() {
    const { amount } = this.state;
    return (
      <label htmlFor="settings-amount-input">
        Quantidade:
        <input
          id="settings-amount-input"
          type="text"
          name="amount"
          value={ amount }
          onChange={ this.handleChange }
          data-testid="settings-amount-input"
        />
      </label>
    );
  }

  inputDifficulty() {
    const { difficulty } = this.state;
    return (
      <label htmlFor="settings-difficulty-input">
        Dificuldade:
        <select
          id="settings-difficulty-input"
          type="text"
          name="difficulty"
          value={ difficulty }
          onChange={ this.handleChange }
          data-testid="settings-difficulty-input"
        >
          <option value="any">Any Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </label>
    );
  }

  inputType() {
    const { type } = this.state;
    return (
      <label htmlFor="settings-type-input">
        Tipo:
        <select
          id="settings-type-input"
          name="type"
          value={ type }
          onChange={ this.handleChange }
          data-testid="settings-type-input"
        >
          <option value="any">Todos</option>
          <option value="multiple">Múltipla escolha</option>
          <option value="boolean">Verdadeiro / Falso</option>
        </select>
      </label>
    );
  }

  inputEncode() {
    const { encode } = this.state;
    return (
      <label htmlFor="settings-encode-input">
        Encode:
        <input
          id="settings-encode-input"
          type="text"
          name="encode"
          value={ encode }
          onChange={ this.handleChange }
          data-testid="settings-encode-input"
        />
      </label>
    );
  }

  allCategories() {
    return <option value="any">Todas</option>;
  }

  render() {
    const { category } = this.state;
    const { categories, isFetching } = this.props;
    if (isFetching) return <h1 data-testid="settings-title">Configurações</h1>;
    return (
      <div className="settings">
        <header>
          <h1 data-testid="settings-title">Configurações</h1>
        </header>
        <main>
          <div>
            {this.inputAmount()}
            <label htmlFor="settings-category-input">
              Categoria:
              <select
                id="settings-category-input"
                name="category"
                value={ category }
                onChange={ this.handleChange }
                data-testid="settings-category-input"
              >
                {this.allCategories()}
                {categories.map((cat) => (
                  <option key={ cat.id } value={ cat.id }>{cat.name}</option>
                ))}
              </select>
            </label>
            {this.inputDifficulty()}
            {this.inputType()}
            {this.inputEncode()}
          </div>
        </main>
      </div>
    );
  }
}

Settings.propTypes = {
  setStateInRedux: PropTypes.func.isRequired,
  fetchCategories: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  stateRedux: state.settings,
  categories: state.settings.categories,
  isFetching: state.settings.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  setStateInRedux: (value) => dispatch(setStateInReduxAction(value)),
  fetchCategories: () => dispatch(fetchCategoriesThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
