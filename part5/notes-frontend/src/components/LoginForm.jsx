import { useState } from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ loginAttempt }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    loginAttempt({ username, password });

    setUsername('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          name='username'
          id='username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          style={{ display: 'block' }}
        />
      </div>

      <div>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          id='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          style={{ display: 'block' }}
        />
      </div>

      <input id='login-button' type='submit' value='Login' />
    </form>
  );
};

LoginForm.propTypes = {
  loginAttempt: PropTypes.func.isRequired,
};

export default LoginForm;
