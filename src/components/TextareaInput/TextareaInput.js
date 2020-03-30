import React from 'react';
import { string, func } from 'prop-types';
import styles from './TextareaInput.module.css';
// Components
import { InputLabel } from '../InputLabel/InputLabel';
import { InputError } from '../InputError/InputError';

export function TextareaInput({ id, errorMessage, setValue, label, ...props }) {
  const onTextChange = event => setValue(event.target.value);
  const textAreaStyles = [
    styles.textInput,
    errorMessage ? styles.textInput_error : '',
  ].join(' ');

  return (
    <div className={styles.container}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <textarea
        id={id}
        setvalue={props.value}
        onChange={onTextChange}
        className={textAreaStyles}
        placeholder={props.placeholder}
        {...props}
      />
      {/* ERROR MESSAGE */}
      <InputError errorMessage={errorMessage} />
    </div>
  );
}

TextareaInput.propTypes = {
  id: string.isRequired,
  value: string.isRequired,
  setValue: func.isRequired,
  label: string,
  placeholder: string,
  errorMessage: string,
};

TextareaInput.defaultProps = {
  placeholder: '',
  label: '',
  errorMessage: '',
};
