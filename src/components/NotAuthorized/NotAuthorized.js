import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotAuthorized.module.css';

export function NotAuthorized() {
  return (
    <section className={styles.container}>
      <h1>
        To make changes, please <Link to="/login">Login</Link> <span role="img" aria-label="alien face">👽</span>
      </h1>
    </section>
  );
}
