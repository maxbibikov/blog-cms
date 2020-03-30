import React from 'react';
import styles from './SecondaryBtn.module.css';

export function SecondaryBtn({ children, ...props }) {
  return (
    <button {...props} className={styles.btn}>
      {children}
    </button>
  );
}
