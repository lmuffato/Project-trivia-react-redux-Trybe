import React, { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import timeLeft from '../redux/actions/timer.action';

export default function Countdown() {
  const maxTime = 30;
  const interval = 1000;
  const [timer, setTimer] = useState(maxTime);
  const intervalRef = useRef(null);
  const dispatch = useDispatch();
  const clear = () => {
    window.clearInterval(intervalRef.current);
  };

  const reduzirTempo = () => {
    let timeLeft2 = 30;
    for (let timerIndex = maxTime; timerIndex > 0; timerIndex -= 2)
    { setTimeout(console.log('hello'), 10000);
      timeLeft2 -= 2;
      // dispatch(timeLeft(timeLeft2));
      console.log(timeLeft2);
    }
  }
  reduzirTempo();

  const handleTimer = () => {
    setTimer((time) => time - 1);
  };

  useEffect(async () => {
    intervalRef.current = await window.setInterval(handleTimer, interval);
    handleTimer();
    return () => clear();
  }, []);

  useEffect(() => {
    if (timer === 0) {
      clear();
      dispatch(timeLeft(timer));
    }
  }, [timer]);

  return (
    <div>
      { timer }
    </div>
  );
}
