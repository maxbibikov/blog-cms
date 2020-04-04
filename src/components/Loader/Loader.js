import React from 'react';
import styles from './Loader.module.css';

export function Loader() {
  return (
    <section className={styles.container}>
      <h1 className={styles.caption}>Loading</h1>
    </section>
  );
}
