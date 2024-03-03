import React from 'react';
import ReactDOM from 'react-dom/client';
import { legacy_createStore as createStore } from 'redux';

const counterReducer = (state, action) => {
  let newState = state;

  switch (action.type) {
    case 'INCREMENT':
      newState += 1;
      break;
    case 'DECREMENT':
      newState -= 1;
      break;
    case 'ZERO':
    default:
      newState = 0;
      break;
  }

  return newState;
};

const store = createStore(counterReducer);

const App = () => {
  return (
    <div>
      <div>{store.getState()}</div>

      <button onClick={() => store.dispatch({ type: 'INCREMENT' })}>
        Plus
      </button>
      <button onClick={() => store.dispatch({ type: 'DECREMENT' })}>
        Minus
      </button>
      <button onClick={() => store.dispatch({ type: 'ZERO' })}>Zero</button>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));

const renderApp = () => {
  root.render(<App />);
};

renderApp();

store.subscribe(renderApp);
