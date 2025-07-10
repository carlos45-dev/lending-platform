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
      {isOpen && <div onClick={closeSidebar} style={{
        position: 'fixed',
        top: '60px',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: 998
      }}></div>}

      <div className={`${styles.sidebar} ${isOpen ? styles.show : ''}`}>
        <ul className={styles.mainmenu}>
          <li><a href="#" className={styles.menu}>Home</a></li>
          <li><a href="#" className={styles.menu}>Services</a></li>
          <li><a href="#" className={styles.menu}>About</a></li>
          <li><a href="#" className={styles.menu}>Contact</a></li>
          <li><a href="#" className={styles.menu}>Logout</a></li>
        </ul>
      </div>
    </>
  );
}

export default Header;
