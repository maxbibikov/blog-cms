import React from 'react';
import { string } from 'prop-types';
import styles from './TextInput.module.css';
// Components
import { InputLabel } from '../InputLabel/InputLabel';
import { InputError } from '../InputError/InputError';

export function TextInput({ id, errorMessage, setValue, label, ...props }) {
  const inputStyles = [
    styles.textInput,
    errorMessage ? styles.textInput_error : '',
  ].join(' ');

  return (
    <div className={styles.container}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <input
        id={id}
        value={props.value}
        className={inputStyles}
        placeholder={props.placeholder}
        {...props}
      />
      {/* ERROR MESSAGE */}
      <InputError errorMessage={errorMessage} />
    </div>
  );
}

TextInput.propTypes = {
  id: string.isRequired,
  value: string.isRequired,
  label: string,
  placeholder: string,
  errorMessage: string,
};

TextInput.defaultProps = {
  placeholder: '',
  label: '',
  errorMessage: '',
};
