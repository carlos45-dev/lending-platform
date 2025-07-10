import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import styles from '../styles/Header.module.css';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const menuItems = ['Home', 'Services', 'About', 'Contact', 'Logout'];

  return (
    <>
      <div className={styles.header}>
        <div className={styles.user}>
          <FontAwesomeIcon icon={faCircleUser} size="2x" />
        </div>

        <h2>UniFund</h2>

        <div onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} size="2x" />
        </div>
      </div>

      {/* Overlay to close the sidebar */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          style={{
            position: 'fixed',
            top: '60px',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 998
          }}
        ></div>
      )}

      <div className={`${styles.sidebar} ${isOpen ? styles.show : ''}`}>
        <ul className={styles.mainmenu}>
          {menuItems.map((item, index) => (
            <li key={index} className={`${styles.menuItem} ${isOpen ? styles['menu-item'] : ''}`}>
              <a href="#" className={styles.menu}>{item}</a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Header;
