import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { getCategories } from '../services/api';
import { setSettings } from '../actions';

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
    this.handleChange = this.handleChange.bind(this);
    this.save = this.save.bind(this);
  }

  componentDidMount() {
    this.loadCategories();
  }

  getSelectCategories() {
    const { categories } = this.state;
    return (
      <select name="category" onChange={ this.handleChange }>
        {categories
          .map((category, index) => (
            <option value={ category.id } key={ index }>
              {category.name}
            </option>))}
      </select>
    );
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

  save() {
    const { category, quantity, difficulty } = this.state;
    const settings = {
      category, quantity, difficulty,
    };

    const { toSettings } = this.props;
    toSettings(settings);

    this.setState({ save: true });
  }

  render() {
    const { categories, quantity, save } = this.state;

    if (save) {
      return <Redirect to="/" />;
    }

    return (
      <>
        <h1 data-testid="settings-title"> Settings </h1>
        <input name="quantity" onChange={ this.handleChange } value={ quantity } />
        { categories && this.getSelectCategories() }
        <select name="difficulty" onChange={ this.handleChange }>
          <option key="1000" value="easy">Easy</option>
          <option key="1001" value="medium">Medium</option>
          <option key="1002" value="hard">Hard</option>
        </select>
        <button type="button" onClick={ this.save }>Save</button>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  toSettings: (settings) => dispatch(setSettings(settings)),
});

export default connect(null, mapDispatchToProps)(Settings);
