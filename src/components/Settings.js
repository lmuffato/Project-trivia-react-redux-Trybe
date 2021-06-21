import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Modal, Button } from 'react-bootstrap';
import '../Settings.css';
// import translate from '@vitalets/google-translate-api';
import { translate, setCORS } from 'google-translate-api-browser';
import {
  getCategories as getCategoriesAction,
  updateUrl as updateUrlAction,
  choseLanguage as choseLanguageAction,
  updateCategoriesAfterTranslation as updateCategories,
} from '../actions';

setCORS('https://cors.bridged.cc/');
// setting up cors-anywhere server address

const difficulties = ['Easy', 'Medium', 'Hard'];
const types = ['Multiple Choice', 'True / False'];
let difficultiesTranslated = [];
let typesTranslated = [];

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'en',
      urlParts: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.renderCategorySelect = this.renderCategorySelect.bind(this);
    this.renderDifficultySelect = this.renderDifficultySelect.bind(this);
    this.renderTypeSelect = this.renderTypeSelect.bind(this);
    this.choseLanguageSettings = this.choseLanguageSettings.bind(this);
    this.translateToPt = this.translateToPt.bind(this);
    this.saveSettings = this.saveSettings.bind(this);
  }

  componentDidMount() {
    const { getCategories } = this.props;
    getCategories();
  }

  async translateToPt(string) {
    const translated = await translate(string, { to: 'pt' });
    return translated;
  }

  handleChange({ target: { name, value } }) {
    this.setState(({ urlParts }) => ({
      urlParts: [...urlParts, `&${name}=${value}`],
    }));
  }

  saveSettings() {
    const { urlParts, language } = this.state;
    const { updateUrl, choseLanguage, onHide } = this.props;
    updateUrl(!urlParts.length ? '' : urlParts);
    if (language !== 'en') {
      choseLanguage('pt');
      onHide();
    }
  }

  choseLanguageSettings() {
    this.setState(
      ({ language }) => ({
        language: language === 'en' ? 'pt' : 'en',
      }),
      () => {
        const { language } = this.state;
        const { categories, updateCategoriesTranslate } = this.props;
        if (language === 'pt') {
          categories.map(async ({ name, id }) => {
            const translated = await this.translateToPt(name);
            updateCategoriesTranslate({ name: translated.text, id });
          });
          difficulties.map(async (difficulty) => {
            const translated = await this.translateToPt(difficulty);
            difficultiesTranslated = [
              ...difficultiesTranslated,
              translated.text,
            ];
          });
          types.map(async (type) => {
            const translated = await this.translateToPt(type);
            typesTranslated = [...typesTranslated, translated.text];
          });
        } else {
          updateCategoriesTranslate('');
          difficultiesTranslated = [];
          typesTranslated = [];
        }
      },
    );
  }

  renderCategorySelect() {
    const { categories } = this.props;
    const { language } = this.state;
    return (
      <Form.Control
        name="category"
        as="select"
        className="settings-select"
        defaultValue={ language === 'en' ? 'Category' : 'Categoria' }
        onChange={ this.handleChange }
      >
        <option disabled hidden>
          {language === 'en' ? 'Category' : 'Categoria'}
        </option>
        {categories.map(({ name, id }) => (
          <option key={ id } value={ id }>
            {name}
          </option>
        ))}
      </Form.Control>
    );
  }

  renderDifficultySelect() {
    const { language } = this.state;
    return (
      <Form.Control
        as="select"
        name="difficulty"
        className="settings-select"
        defaultValue={ language === 'en' ? 'Difficulty' : 'Dificuldade' }
        onChange={ this.handleChange }
      >
        <option disabled hidden>
          {language === 'en' ? 'Difficulty' : 'Dificuldade'}
        </option>
        {difficulties.map((difficulty, i) => (
          <option key={ i } value={ difficulty.toLowerCase() }>
            {difficultiesTranslated.length
              ? difficultiesTranslated[i]
              : difficulty}
          </option>
        ))}
      </Form.Control>
    );
  }

  renderTypeSelect() {
    const { language } = this.state;
    return (
      <Form.Control
        as="select"
        className="settings-select"
        name="type"
        defaultValue={ language === 'en' ? 'Type' : 'Tipo' }
        onChange={ this.handleChange }
      >
        <option disabled hidden>
          {language === 'en' ? 'Type' : 'Tipo'}
        </option>
        {types.map((type, i) => (
          <option
            key={ i }
            value={ type === 'True / False' ? 'boolean' : 'multiple' }
          >
            {typesTranslated.length ? typesTranslated[i] : type}
          </option>
        ))}
      </Form.Control>
    );
  }

  render() {
    const { language } = this.state;
    const { onHide, show } = this.props;
    return (
      <Modal
        show={ show }
        dialogClassName="settings-container"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter" data-testid="settings-title">
            Configurações
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="toggle-language-container">
            <Form.Label>Inglês (English)</Form.Label>
            <div className="switch__container">
              <input
                onChange={ this.choseLanguageSettings }
                id="switch-flat"
                checked={ language !== 'en' }
                className="switch switch--flat"
                type="checkbox"
              />
              <Form.Label htmlFor="switch-flat" />
            </div>
            <Form.Label>Português (Portuguese)</Form.Label>
          </Form.Group>
          <div className="select-container">
            {this.renderCategorySelect()}
            {this.renderDifficultySelect()}
            {this.renderTypeSelect()}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={ onHide }>
            {language === 'en' ? 'Close' : 'Fechar'}
          </Button>
          <Button variant="success" onClick={ this.saveSettings }>
            {language === 'en' ? 'Save' : 'Salvar'}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    game: { categories },
    gameTranslation: { categories: categoriesTranslated },
  } = state;
  return {
    categories: categoriesTranslated.length ? categoriesTranslated : categories,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getCategories: () => dispatch(getCategoriesAction()),
  updateUrl: (part) => dispatch(updateUrlAction(part)),
  choseLanguage: (language) => dispatch(choseLanguageAction(language)),
  updateCategoriesTranslate: (translated) => dispatch(updateCategories(translated)),
});

Settings.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  getCategories: PropTypes.func,
  updateUrl: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
