import React from 'react';
import Link from 'next/link';
import styles from './Dock.module.css';

const navItems = [
  { label: 'Home', href: '/', icon: '◈' },
  { label: 'Booking', href: '/booking', icon: '✦' },
  { label: 'Reputation', href: '/reputation', icon: '❂' },
];

export const Dock: React.FC = () => {
  return (
    <div className={styles.container}>
      <nav className={`${styles.dock} glass glass-rim`}>
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className={styles.item}>
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};
