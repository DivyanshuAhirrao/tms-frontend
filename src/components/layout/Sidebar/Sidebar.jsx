import React, { useState } from 'react';
import styles from './Sidebar.module.scss';

const Sidebar = ({ isOpen, onClose }) => {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  
  const menuItems = [
    {
      id: 'home',
      label: 'Home',
      icon: '🏠',
      link: '#home'
    },
    {
      id: 'shipments',
      label: 'Shipments',
      icon: '📦',
      submenu: [
        { label: 'All Shipments', link: '#all-shipments' },
        { label: 'In Transit', link: '#in-transit' },
        { label: 'Delivered', link: '#delivered' }
      ]
    },
    {
      id: 'carriers',
      label: 'Carriers',
      icon: '🚚',
      submenu: [
        { label: 'Active Carriers', link: '#active-carriers' },
        { label: 'Carrier Performance', link: '#carrier-performance' }
      ]
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: '📊',
      link: '#reports'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: '⚙️',
      submenu: [
        { label: 'Profile', link: '#profile' },
        { label: 'Preferences', link: '#preferences' }
      ]
    }
  ];
  
  const toggleSubmenu = (id) => {
    setOpenSubmenu(openSubmenu === id ? null : id);
  };
  
  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose}></div>}
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <nav className={styles.nav}>
          {menuItems.map((item) => (
            <div key={item.id} className={styles.menuItem}>
              {item.submenu ? (
                <>
                  <button
                    className={styles.menuButton}
                    onClick={() => toggleSubmenu(item.id)}
                  >
                    <span className={styles.icon}>{item.icon}</span>
                    <span className={styles.label}>{item.label}</span>
                    <span className={`${styles.arrow} ${openSubmenu === item.id ? styles.open : ''}`}>
                      ▼
                    </span>
                  </button>
                  {openSubmenu === item.id && (
                    <div className={styles.submenu}>
                      {item.submenu.map((subItem, index) => (
                        <a
                          key={index}
                          href={subItem.link}
                          className={styles.submenuLink}
                        >
                          {subItem.label}
                        </a>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <a href={item.link} className={styles.menuLink}>
                  <span className={styles.icon}>{item.icon}</span>
                  <span className={styles.label}>{item.label}</span>
                </a>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
