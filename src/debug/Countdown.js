import React, { useRef, useEffect, useState } from 'react';

export default function Countdown(disabledFunc) {
  let maxTime = 5;
  const interval = 1000;
  const [timer, setTimer] = useState(maxTime);
  const intervalRef = useRef(null);
  const clear = () => {
    window.clearInterval(intervalRef.current);
  };

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setTimer((time) => time - 1)
    }, interval);
    return () => clear();
  }, []);

  useEffect(() => {
    if (timer === 0) {
      clear();  
    }
  }, [timer]);

  return (
    <div>{ timer }</div>
  );
}
