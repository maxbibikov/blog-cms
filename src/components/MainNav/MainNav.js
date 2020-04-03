import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

// Styles
import styles from './MainNav.module.css';

// Assets
import logo from '../../assets/logo.svg';

function StyledLink({ label, to, activeOnlyWhenExact }) {
  const match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact,
  });

  return (
    <div
      className={`${styles.nav_item} ${match ? styles.nav_item_active : ''}`}
    >
      <Link
        className={`${styles.nav_link} ${match ? styles.nav_link_active : ''}`}
        to={to}
      >
        {label}
      </Link>
    </div>
  );
}

export function MainNav({ authorized }) {
  let authButton;

  if (authorized) {
    authButton = (
      <StyledLink label="User" to="/user" activeOnlyWhenExact="true" />
    );
  } else {
    authButton = (
      <StyledLink label="Login" to="/login" activeOnlyWhenExact="true" />
    );
  }

  return (
    <section className={styles.topbar}>
      <nav className={styles.nav_list}>
        <img src={logo} className={styles.logo} alt="logo" />
        <StyledLink label="Posts" to="/posts" />
        <StyledLink label="Write" to="/new" activeOnlyWhenExact="true" />
        {authButton}
      </nav>
    </section>
  );
}
