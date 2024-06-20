import React from 'react';
import styles from './Button.module.css'; // Import CSS Module

const Button = ({ children, icon }) => {
  const buttonClass = icon ? `${styles.primaryButton} ${styles.primaryButtonWithIcon}` : styles.primaryButton;
  return (
    <button className={buttonClass}>
      {icon && <i className="fas fa-upload"></i>}  {/* Font Awesome icon */}
      {children}
    </button>
  );
};

export default Button;