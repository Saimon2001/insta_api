import React from 'react';
import styles from './CustomFileInput.module.css';

const CustomFileInput = ({ label, onChange }) => {
  return (
    <label className={styles.customFileInput}>
      {label}
      <input type="file" onChange={onChange} />
    </label>
  );
};

export default CustomFileInput;