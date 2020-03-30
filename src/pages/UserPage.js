import React from 'react';
import { Redirect } from 'react-router-dom';
import { func, shape, string, bool } from 'prop-types';
// Components
import { PrimaryBtn } from '../components/Buttons/PrimaryBtn/PrimaryBtn';
import styles from './UserPage.module.css';

export function UserPage({ authorized, user, logoutAsync, loading }) {
  // RENDER
  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h1>...Loading</h1>
      </div>
    );
  }
  if (authorized) {
    return (
      <section className={styles.container}>
        <h1>
          Welcome back,{' '}
          <span className={styles.usernameText}>{user.firstName}</span>!
          <span role="img" aria-label="funny ghost emoji">
            👻
          </span>
        </h1>
        <div className={styles.logoutBtn}>
          <PrimaryBtn onClick={logoutAsync}>Logout</PrimaryBtn>
        </div>
      </section>
    );
  }

  return <Redirect to="/login" />;
}

UserPage.propTypes = {
  logoutAsync: func.isRequired,
  user: shape({ firstName: string }).isRequired,
  authorized: bool.isRequired,
  loading: bool.isRequired,
};
