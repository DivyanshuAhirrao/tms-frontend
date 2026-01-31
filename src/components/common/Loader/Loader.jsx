import React from 'react';
import styles from './Loader.module.scss';

const Loader = ({ size = 'medium', fullPage = false }) => {
  if (fullPage) {
    return (
      <div className={styles.fullPage}>
        <div className={`${styles.loader} ${styles[size]}`}></div>
      </div>
    );
  }
  
  return <div className={`${styles.loader} ${styles[size]}`}></div>;
};

export default Loader;
