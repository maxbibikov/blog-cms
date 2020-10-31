import React from 'react';
import styles from './Dialog.module.css';
import { func, bool, string } from 'prop-types';

// Components
import { PrimaryBtn, SecondaryBtn } from '../Buttons';

export function Dialog({
  showDialog,
  setShowDialog,
  title,
  action,
  actionBtnText,
}) {
  if (!showDialog) {
    return null;
  }

  return (
    <>
      <div
        className={styles.container}
        onClick={() => {
          setShowDialog(false);
        }}
      ></div>
      <div className={styles.card}>
        <header className={styles.card__header}>
          <h3>{title}</h3>
        </header>
        <div className={styles.controls}>
          <PrimaryBtn onClick={action}>{actionBtnText}</PrimaryBtn>
          <div className={styles.vertical_divider}></div>
          <SecondaryBtn onClick={() => setShowDialog(false)}>
            CANCEL
          </SecondaryBtn>
        </div>
      </div>
    </>
  );
}

Dialog.propTypes = {
  showDialog: bool.isRequired,
  setShowDialog: func.isRequired,
  title: string.isRequired,
  actionBtnText: string.isRequired,
};
