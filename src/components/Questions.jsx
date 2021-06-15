import React, { Component } from 'react';

export default class Questions extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      question: {},
    };
  }

  componentDidMount() {
    this.getQuestions();
  }

  async getQuestions() {
    const getToken = localStorage.getItem('token');
    const fetchApi = await fetch(`https://opentdb.com/api.php?amount=5&token=${getToken}`);
    const response = await fetchApi.json();
    const questions = await response.results;
    this.setState({ questions });
  }

  // handleClick() {
  //   const green = '3px solid rgb(6, 240, 15)';
  //   const red = '3px solid rgb(255, 0, 0)';
  // }

  render() {
    // const { questions } = this.state;
    // const question = questions[0];
    // this.setState({ question });
    return (
      <div />
    );
  }
}
