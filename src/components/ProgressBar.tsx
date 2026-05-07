import React from 'react';
import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  progress: number; // 0 to 100
  label?: string;
  subLabel?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, label, subLabel }) => {
  return (
    <div className={styles.container}>
      {(label || subLabel) && (
        <div className={styles.header}>
          {label && <span className={styles.label}>{label}</span>}
          {subLabel && <span className={styles.subLabel}>{subLabel}</span>}
        </div>
      )}
      <div className={styles.track}>
        <div 
          className={styles.fill} 
          style={{ width: `${progress}%` }}
        >
          <div className={styles.glow}></div>
        </div>
      </div>
    </div>
  );
};
