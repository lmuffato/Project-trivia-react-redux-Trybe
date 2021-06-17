import React, { Component } from 'react';
import { object } from 'prop-types';
import '../styles/settings.css';
import { connect } from 'react-redux';
import { addFilter } from '../actions';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      filter: {},
    };

    this.fetchApi = this.fetchApi.bind(this);
    this.handlesChange = this.handlesChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.fetchApi();
  }

  async fetchApi() {
    const endPoint = 'https://opentdb.com/api_category.php';
    const { trivia_categories: triviaCategories } = await (await fetch(endPoint)).json();
    const values = triviaCategories.map((item) => Object.values(item)[1]);
    this.setState({
      data: values,
    });
  }

  handlesChange({ target: { name, value } }) {
    const { filter } = this.state;
    this.setState((prevState) => ({
      ...prevState,
      filter: { ...filter, [name]: value },
    }));
  }

  categoryInput() {
    const { data } = this.state;
    return (
      <select name="category" id="category" onChange={ this.handlesChange }>
        <option value="selecione-a-categ">Selecione a Categoria</option>
        { data.map((item, index) => (
          <option value={ item } key={ index }>{item}</option>
        ))}
      </select>
    );
  }

  difficulttInput() {
    return (
      <select name="difficult" id="difficult" onChange={ this.handlesChange }>
        <option value="selecione-a-dific">Selecione a dificuldade</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    );
  }

  typeInput() {
    return (
      <select name="type" id="type" onChange={ this.handlesChange }>
        <option value="selecione-o-tipo">Selecione o Tipo</option>
        <option value="multiple-choice">Multiple choice</option>
        <option value="true-false">True or False</option>
      </select>
    );
  }

  handleClick() {
    const { history, setFilter } = this.props;
    const { filter } = this.state;
    setFilter(filter);
    history.push('/');
  }

  render() {
    return (
      <div className="main-settings">
        <div data-testid="settings-title" className="title-settings">
          <h1>Configurações</h1>
        </div>
        <form className="form-settings">
          { this.categoryInput() }
          { this.difficulttInput() }
          { this.typeInput() }
        </form>
        <button
          type="button"
          className="btn-settings"
          onClick={ this.handleClick }
        >
          Logar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setFilter: (filterQuest) => dispatch(addFilter(filterQuest)),
});

Settings.propTypes = {
  history: object,
}.isRiquered;

export default connect(null, mapDispatchToProps)(Settings);
