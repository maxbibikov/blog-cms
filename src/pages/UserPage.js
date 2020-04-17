import React from 'react';
import { Redirect } from 'react-router-dom';
import { func, shape, string, bool } from 'prop-types';
// Components
import styles from './UserPage.module.css';
import { PrimaryBtn } from '../components/Buttons';
import { Loader } from '../components/Loader';

export function UserPage({ authorized, user, logoutAsync, loading }) {
  // RENDER
  if (loading) {
    return <Loader />;
  }
  if (authorized) {
    return (
      <section className={styles.container}>
        <h1>
          Welcome,
          <span className={styles.usernameText}>{` ${user.firstName}`}</span>!
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
