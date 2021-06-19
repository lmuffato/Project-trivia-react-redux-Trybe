import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import updateQuestion from '../redux/actions/updateQuestion.action';
import { fetchQuestion } from '../services/api';
import GamePlay from '../components/GamePlay';
import Countdown from '../components/Countdown';
import ImgLogo from '../components/LoginComponents/ImgLogo';

export default function Game() {
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const { questions } = useSelector((state) => state.gameReducer);

  useEffect(() => {
    async function update() {
      const quest = await fetchQuestion(token);
      dispatch(updateQuestion(quest));
    }
    update();
  }, []);

  return (
    <div>
      <ImgLogo />
      <Header />
      <Countdown />
      { questions.length > 0 ? <GamePlay /> : null}
    </div>
  );
}
