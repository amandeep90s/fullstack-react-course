import PropTypes from 'prop-types';
import { useContext } from 'react';
import CounterContext from './CounterContext';

const Button = ({ type, label }) => {
  const { counterDispatch } = useContext(CounterContext);

  return <button onClick={() => counterDispatch({ type })}>{label}</button>;
};

Button.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
};

export default Button;
