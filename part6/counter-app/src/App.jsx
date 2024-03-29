import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, reset } from './redux/features/counterSlice';

const App = () => {
  const { counter } = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <>
      <h1>Counter : {counter}</h1>

      <button onClick={() => dispatch(increment())}>Increment</button>
      <button
        style={{ margin: '0 1rem' }}
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </>
  );
};

export default App;
