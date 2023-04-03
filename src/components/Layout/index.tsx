import React, { ReactNode } from 'react';
import Header from '../Header';

import styles from './styles.module.scss';

const Layout: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = 'root'
}) => {
  return (
    <div className={`${styles.root} ${styles[className]}`}>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
