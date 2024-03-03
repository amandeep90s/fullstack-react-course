import React, { useState } from 'react';
import Notification from './Notification';
import PropTypes from 'prop-types';

const LoginForm = ({ loginAttempt, message, user }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    loginAttempt({ username, password });
    if (user) {
      setUsername('');
      setPassword('');
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>User Login</h1>
      {message && <Notification message={message} />}
      <div>
        <label htmlFor='username'>Username</label> <br />
        <input
          type='text'
          id='username'
          name='username'
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder='Enter username'
          required
        />
      </div>
      <div>
        <label htmlFor='password'>Password</label> <br />
        <input
          type='password'
          id='password'
          name='password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder='Enter password'
          required
        />
      </div>
      <br />
      <button id='login-button' type='submit'>
        Login
      </button>
    </form>
  );
};

LoginForm.propTypes = {
  loginAttempt: PropTypes.func,
  message: PropTypes.string,
  user: PropTypes.object,
};

export default LoginForm;
