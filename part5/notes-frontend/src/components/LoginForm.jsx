const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          name='username'
          id='username'
          value={username}
          onChange={handleUsernameChange}
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
          onChange={handlePasswordChange}
          style={{ display: 'block' }}
        />
      </div>

      <input type='submit' value='Login' />
    </form>
  );
};

export default LoginForm;
