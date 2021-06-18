import React from 'react';
import { setToLocalStorage } from './storage';

class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: {},
    };
    this.APIfetch = this.APIfetch.bind(this);
    this.selectId = this.selectId.bind(this);
    this.setCategory = this.setCategory.bind(this);
    this.setDificulte = this.setDificulte.bind(this);
    this.setType = this.setType.bind(this);
  }

  componentDidMount() {
    this.APIfetch();
  }

  setCategory(event) {
    setToLocalStorage('category', event.target.value);
  }

  setDificulte(event) {
    setToLocalStorage('difficulty', event.target.value);
  }

  setType(event) {
    setToLocalStorage('type', event.target.value);
  }

  async APIfetch() {
    const categories = await fetch('https://opentdb.com/api_category.php');
    const categoriesJson = await categories.json();
    this.setState({ categories: categoriesJson });
  }

  selectId() {
    const { categories } = this.state;
    const arrayCategoiries = categories.trivia_categories;
    if (arrayCategoiries !== undefined) {
      return (
        <select onChange={ this.setCategory }>
          {
            arrayCategoiries.map((category) => {
              const { id, name } = category;
              return <option key={ id } value={ id }>{ name }</option>;
            })
          }
        </select>
      );
    }
    return '';
  }

  render() {
    return (
      <form>
        {this.selectId()}
        <select onChange={ this.setDificulte }>
          <option>Any Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <select onChange={ this.setType }>
          <option>Any Type</option>
          <option value="multiple">Multiple Choice</option>
          <option value="boolean">True / False</option>
        </select>
      </form>
    );
  }
}

export default Settings;
