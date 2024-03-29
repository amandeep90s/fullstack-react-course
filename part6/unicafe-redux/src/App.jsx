import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bad, good, ok, zero } from './redux/features/counterSlice';

const App = () => {
  const dispatch = useDispatch();
  const {
    good: goodCount,
    bad: badCount,
    ok: okCount,
  } = useSelector((state) => state.counter);

  const handleGood = () => {
    dispatch(good());
  };

  const handleBad = () => {
    dispatch(bad());
  };

  const handleOk = () => {
    dispatch(ok());
  };

  const handleReset = () => {
    dispatch(zero());
  };

  return (
    <div>
      <button onClick={handleGood}>good</button>
      <button onClick={handleOk}>ok</button>
      <button onClick={handleBad}>bad</button>
      <button onClick={handleReset}>reset stats</button>
      <div>good {goodCount}</div>
      <div>ok {okCount}</div>
      <div>bad {badCount}</div>
    </div>
  );
};

export default App;
