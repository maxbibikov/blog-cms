import React, { useState } from 'react';
import { string, func, arrayOf, shape } from 'prop-types';

// Components
import { InputError } from '../InputError/InputError';
import { TextInput } from '../TextInput/TextInput';
import { PrimaryBtn } from '../Buttons/PrimaryBtn/PrimaryBtn';
import styles from './LoginForm.module.css';

export function LoginForm({ loginAsync, error }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  const validateField = (
    fieldName,
    fieldValue,
    { required, maxLength, regex, regexErrorMessage }
  ) => {
    if (required) {
      if (!fieldValue || fieldValue.length === 0) {
        return { valid: false, error: `Please enter ${fieldName}` };
      }
      if (fieldValue.length > maxLength) {
        return {
          valid: false,
          error: `${fieldName} should be less than ${maxLength} characters`,
        };
      }
      if (regex && !regex.test(fieldValue)) {
        return { valid: false, error: regexErrorMessage };
      }

      return { valid: true };
    }
  };
  const validateUsername = () => {
    const validationResult = validateField('username', username, {
      required: true,
    });
    if (!validationResult.valid) {
      setUsernameErr(validationResult.error);
      return false;
    }
    return true;
  };
  const validatePassword = () => {
    const validationResult = validateField('password', password, {
      required: true,
    });
    if (!validationResult.valid) {
      setPasswordErr(validationResult.error);
      return false;
    }

    return true;
  };

  const onUsernameChange = event => {
    setUsername(event.target.value);
  };
  const onPasswordChange = event => {
    setPassword(event.target.value);
  };
  const onSubmitClick = event => {
    setPasswordErr('');
    setUsernameErr('');
    const usernameValid = validateUsername();
    const paswordValid = validatePassword();
    if (usernameValid && paswordValid) {
      loginAsync(username, password);
    }
  };

  return (
    <section className={styles.container}>
      <InputError errorMessage={error} />
      <h1>Login Form</h1>
      <div className={styles.inputContainer}>
        <TextInput
          id="username"
          label="Username"
          onChange={onUsernameChange}
          value={username}
          placeholder="Enter username"
          errorMessage={usernameErr}
        />
      </div>

      <div className={styles.inputContainer}>
        <TextInput
          id="password"
          label="Password"
          onChange={onPasswordChange}
          value={password}
          placeholder="Enter password"
          errorMessage={passwordErr}
          type="password"
        />
      </div>

      <div className={styles.btnContainer}>
        <PrimaryBtn onClick={onSubmitClick}>Login</PrimaryBtn>
      </div>
    </section>
  );
}

LoginForm.propTypes = {
  loginAsync: func.isRequired,
  error: string.isRequired,
  errors: arrayOf(shape({})),
};
