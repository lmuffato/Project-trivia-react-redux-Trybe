import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategoriesThunk } from '../redux/action';
import StateInRedux from '../redux/reducer/setStateInRedux';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 5,
      category: 'any',
      difficulty: 'any',
      type: 'any',
      encode: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { fetchCategories } = this.props;
    fetchCategories();
  }

  componentDidUpdate() {
    // this.stateRedux.setStateInRedux();

    // Outra forma de fazer a mesma coisa, posso usar o mapDispatchToProps
    const { setStateInRedux } = this.props;
    setStateInRedux(this.stateRedux.action());
  }

  get stateRedux() { return new StateInRedux(Settings, this); }

  handleChange({ target: { name, type, value, checked } }) {
    const finalValue = type === 'checkbox' ? checked : value;
    this.setState({
      [name]: finalValue,
    });
  }

  inputAmount() {
    const { amount } = this.state;
    return (
      <label htmlFor="settings-amount-input">
        Quantidade:
        <input
          id="settings-amount-input"
          type="number"
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
        <select
          id="settings-encode-input"
          name="encode"
          value={ encode }
          onChange={ this.handleChange }
          data-testid="settings-encode-input"
        >
          <option value="default">Default Encoding</option>
          <option value="urlLegacy">Legacy URL Encoding</option>
          <option value="url3986">URL Encoding (RFC 3986)</option>
          <option value="base64">Base64 Encoding</option>
        </select>
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
          <Link to="/">Login</Link>
        </main>
      </div>
    );
  }
}

Settings.propTypes = {
  setStateInRedux: PropTypes.func.isRequired,
  fetchCategories: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object.isRequired),
  isFetching: PropTypes.bool.isRequired,
};

Settings.defaultProps = {
  categories: [],
};

const mapStateToProps = (state) => ({
  stateRedux: state.settings,
  categories: state.settings.categories,
  isFetching: state.settings.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => dispatch(fetchCategoriesThunk()),
  ...StateInRedux.setStateInRedux(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
