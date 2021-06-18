import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { categoryAction, dificulteAction, typeAction } from '../actions/index';

class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: {},
    };
    this.APIfetch = this.APIfetch.bind(this);
    this.selectId = this.selectId.bind(this);
  }

  componentDidMount() {
    this.APIfetch();
  }

  async APIfetch() {
    const categories = await fetch('https://opentdb.com/api_category.php');
    const categoriesJson = await categories.json();
    this.setState({ categories: categoriesJson });
  }

  selectId() {
    const { selectCategory } = this.props;
    const { categories } = this.state;
    const arrayCategoiries = categories.trivia_categories;
    if (arrayCategoiries !== undefined) {
      return (
        <select onChange={ (event) => selectCategory(event.target.value) }>
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
    const { selectDificulte, selectType } = this.props;
    return (
      <form>
        {this.selectId()}
        <select onChange={ (event) => selectDificulte(event.target.value) }>
          <option value="">Any Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <select onChange={ (event) => selectType(event.target.value) }>
          <option>Any Type</option>
          <option value="multiple">Multiple Choice</option>
          <option value="boolean">True / False</option>
        </select>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  selectCategory: (payload) => dispatch(categoryAction(payload)),
  selectDificulte: (payload) => dispatch(dificulteAction(payload)),
  selectType: (payload) => dispatch(typeAction(payload)),
});

Settings.propTypes = {
  selectCategory: PropTypes.func.isRequired,
  selectDificulte: PropTypes.func.isRequired,
  selectType: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Settings);
