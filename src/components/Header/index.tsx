import React from 'react';

import styles from './styles.module.scss';

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <span>InCode</span>
        <span>Finance</span>
      </div>
    </div>
  );
};

export default Header;
