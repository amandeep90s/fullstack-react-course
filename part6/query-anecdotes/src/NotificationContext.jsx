import PropTypes from 'prop-types';
import { createContext, useMemo, useReducer } from 'react';

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE':
      state = `anecdote '${action.payload.content}' added`;
      return state;
    case 'VOTE':
      state = `anecdote '${action.payload.content}' voted`;
      return state;
    case 'ERROR':
      state = action.payload.error;
      return state;
    case 'CLEAR':
      state = '';
      return state;
    default:
      return '';
  }
};

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ''
  );

  const contextValue = useMemo(
    () => ({
      notification,
      notificationDispatch,
    }),
    [notification]
  );

  return (
    <NotificationContext.Provider value={contextValue}>
      {props.children}
    </NotificationContext.Provider>
  );
};

NotificationContextProvider.propTypes = {
  children: PropTypes.node,
};

export default NotificationContext;
