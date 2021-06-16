import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import updateQuestion from '../redux/actions/updateQuestion.action';
import { fetchQuestion } from '../services/api';
import GamePlay from '../components/GamePlay';
import Countdown from '../debug/Countdown';

export default function Game() {
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const { questions } = useSelector((state) => state.gameReducer);
  const [disabledOptions, disabledFunc] = useState(false);

  const handleDisabled = (time) => {
    if (time === 0) { disabledFunc(true); }
  };

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
      <Countdown disabledFunc={ handleDisabled } />
      { questions.length > 0 && <GamePlay disabledOptions={ disabledOptions } />}
    </div>
  );
}
