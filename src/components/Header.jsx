import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import styles from '../styles/Header.module.css';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.user}>
          <FontAwesomeIcon icon={faCircleUser} size="2x" />
        </div>

        <h2 style={{ textAlign: 'center' }}>UniFund</h2>

        <div onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} size="2x" />
        </div>
      </div>

      <div className={`${styles.sidebar} ${isOpen ? styles.show : ""}`}>
        <ul style={{ listStyleType: 'none' }} className={styles.mainmenu} >
          <li><a href="#"  className={styles.menu}>Home</a></li>
          <li><a href="#"  className={styles.menu}>Services</a></li>
          <li><a href="#"  className={styles.menu}>About</a></li>
          <li><a href="#"  className={styles.menu}>Contact</a></li>
          <li><a href="#"  className={styles.menu}>Logout</a></li>
        </ul>
        
      </div>
    </>
  );
}

export default Header;
