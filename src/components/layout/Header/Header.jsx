import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';

const Header = ({ user, onToggleSidebar }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };
  
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className={styles.menuBtn} onClick={onToggleSidebar}>
          ☰
        </button>
        <h1 className={styles.logo}>TMS</h1>
      </div>
      
      <nav className={styles.nav}>
        <a href="#dashboard" className={styles.navLink}>Dashboard</a>
        <a href="#shipments" className={styles.navLink}>Shipments</a>
        <a href="#reports" className={styles.navLink}>Reports</a>
        <a href="#analytics" className={styles.navLink}>Analytics</a>
      </nav>
      
      <div className={styles.right}>
        <div className={styles.user}>
          <div className={styles.avatar}>
            {user?.username?.charAt(0).toUpperCase()}
          </div>
          <div className={styles.userInfo}>
            <span className={styles.username}>{user?.username}</span>
            <span className={styles.role}>{user?.role}</span>
          </div>
        </div>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
