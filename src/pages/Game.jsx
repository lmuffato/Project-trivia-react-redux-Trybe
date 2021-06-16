import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import updateQuestion from '../redux/actions/updateQuestion.action';
import { fetchQuestion } from '../services/api';

export default function Game() {
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const { questions } = useSelector((state) => state.gameReducer);

  console.log(questions);

  useEffect(() => {
    async function update() {
      const quest = await fetchQuestion(token);
      dispatch(updateQuestion(quest));
    }
    update();
  }, []);

  return (
    <div>
      <Header />
      { questions.length > 0 && <p>{ questions[0].category }</p>}
    </div>
  );
}
