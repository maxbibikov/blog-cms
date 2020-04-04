import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { bool, func } from 'prop-types';
// Components
import { LoginForm } from '../components/LoginForm/LoginForm';
import { fetchBlogApi } from '../utils';
import { Loader } from '../components/Loader';

export function LoginPage({
  setAuthorized,
  authorized,
  setUser,
  loading,
  setLoading,
}) {
  const [error, setError] = useState('');

  const loginAsync = (username, password) => {
    if (!username || !password) {
      return null;
    }
    setError('');
    setLoading(true);

    return fetchBlogApi('/auth/login', 'POST', {
      username,
      password,
    })
      .then((data) => {
        if (data.error) {
          return setError(data.error.message);
        }
        setUser(data);
        return setAuthorized(true);
      })
      .catch((err) => {
        setAuthorized(false);
        console.error('err: ', err);
      })
      .finally(() => setLoading(false));
  };

  // RENDER
  if (loading) {
    return <Loader />;
  }

  if (!authorized) {
    return <LoginForm error={error} loginAsync={loginAsync} />;
  }

  return <Redirect to="/user" />;
}

LoginPage.propTypes = {
  authorized: bool.isRequired,
  setUser: func.isRequired,
  loading: bool.isRequired,
  setLoading: func.isRequired,
  setAuthorized: func.isRequired,
};
