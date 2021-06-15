import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import updateQuestion from '../redux/actions/updateQuestion.action';
import { fetchQuestion } from '../services/api';

export default function Game() {
  const token = localStorage.getItem('token');

  const dispatch = useDispatch();
  useEffect(() => {
    async function update() {
      const questions = await fetchQuestion(token);
      dispatch(updateQuestion(questions));
      // console.log(questions.results[0].category);
    }
    update();
  }, []);

  const { results } = useSelector((state) => state.gameReducer.questions);

  console.log(results[0]);

  return (
    <div>
      <Header />
      <p data-testid="question-category">Category</p>
    </div>
  );
}
