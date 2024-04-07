import PropTypes from 'prop-types';
import { createContext, useMemo, useReducer } from 'react';

const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INC':
      return state + 1;
    case 'DEC':
      return state - 1;
    case 'ZERO':
      return 0;
    default:
      return state;
  }
};

const CounterContext = createContext();

export const CounterContextProvider = (props) => {
  const [counter, counterDispatch] = useReducer(counterReducer, 0);

  const contextValue = useMemo(() => {
    return { counter, counterDispatch };
  }, [counter]);

  return (
    <CounterContext.Provider value={contextValue}>
      {props.children}
    </CounterContext.Provider>
  );
};

CounterContextProvider.propTypes = {
  children: PropTypes.node,
};

export default CounterContext;
