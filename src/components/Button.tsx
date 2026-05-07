import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glass';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}) => {
  return (
    <button 
      className={`${styles.button} ${styles[variant]} ${className}`} 
      {...props}
    >
      <span className={styles.content}>{children}</span>
      <div className={styles.liquid}></div>
    </button>
  );
};
