import React from 'react';
import styles from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', padding = '2rem' }) => {
  return (
    <div className={`${styles.card} ${className}`} style={{ padding }}>
      <div className={styles.glow}></div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};
