import React from 'react';
import styles from './InputLabel.module.css';

export function InputLabel({ children, ...restProps }) {
  return (
    <label {...restProps} className={styles.block_label}>
      {children}
    </label>
  );
}
