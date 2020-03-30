import React from 'react';
import { string } from 'prop-types';
import styles from './InputError.module.css';

export function InputError({ errorMessage }) {
  if (errorMessage) {
    return <p className={styles.input_error}>{errorMessage}</p>;
  }

  return null;
}

InputError.propTypes = {
  errorMessage: string,
};

InputError.defaultProps = {
  errorMessage: '',
};
