import React from 'react';
import styles from './PrimaryBtn.module.css';

export function PrimaryBtn(props) {
  return <button {...props} className={styles.btn} />;
}
