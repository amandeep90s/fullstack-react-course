import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { good } from './redux/features/counterSlice';

const App = () => {
  const dispatch = useDispatch();
  const { good: goodCount } = useSelector((state) => state.counter);

  const handleGood = () => {
    dispatch(good());
  };

  return (
    <div>
      <button onClick={handleGood}>good</button>
      <button>ok</button>
      <button>bad</button>
      <button>reset stats</button>
      <div>good {goodCount}</div>
      <div>ok</div>
      <div>bad</div>
    </div>
  );
};

export default App;
