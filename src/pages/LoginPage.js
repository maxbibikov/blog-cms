import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Utils
import { fetchBlogApi } from '../utils';

export function Login({ setAuthorized, authorized }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const loginAsync = () => {
    if (!username || !password) {
      return null;
    }

    setError('');

    return fetchBlogApi('/auth/login', 'POST', {
      username,
      password,
    })
      .then(() => setAuthorized(true))
      .catch(err => setError(err.message));
  };

  const logoutAsync = () => {
    return fetchBlogApi('/auth/logout', 'POST')
      .then(data => {
        if (data.ok) {
          setAuthorized(false);
        }
      })
      .catch(err => setError(err.message));
  };

  const onUsernameChange = event => setUsername(event.target.value);
  const onPasswordChange = event => setPassword(event.target.value);
  const onSubmitClick = event => {
    event.preventDefault();
    loginAsync();
  };

  const onLogoutClick = () => logoutAsync();

  if (!authorized) {
    return (
      <section>
        {error && <p style={{ color: 'salmon' }}>{error}</p>}
        <form>
          <div>
            <label htmlFor="username">Username</label>
            <input id="username" onChange={onUsernameChange} value={username} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              onChange={onPasswordChange}
              value={password}
            />
          </div>
          <button onClick={onSubmitClick} type="submit">
            Submit
          </button>
        </form>
      </section>
    );
  }

  return (
    <section>
      <h1>
        Welcome back, User!
        <span role="img" aria-label="funny ghost emoji">
          👻
        </span>
        <button onClick={onLogoutClick}>Logout</button>
      </h1>
    </section>
  );
}

Login.propTypes = {
  authorized: PropTypes.bool.isRequired,
  setAuthorized: PropTypes.func.isRequired,
};
