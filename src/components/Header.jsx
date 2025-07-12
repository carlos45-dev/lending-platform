import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import styles from '../styles/Header.module.css';
import { Link } from 'react-router-dom';

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
        <Link to="/profile" style={{ color: '#1A2258' }}>
          <div className={styles.user}>
            <FontAwesomeIcon icon={faCircleUser} size="2x" />
          </div>
        </Link>

        <h2 className={styles.title}>UniFund</h2>

        <div>
          <ul className={styles.nav}>
            <li>
              <Link to="/home" style={{ color: '#1A2258', fontWeight: 'bold' }}>Home</Link>
            </li>
            <li>
              <a href="#" style={{ color: '#1A2258', fontWeight: 'bold' }}>Services</a>
            </li>
            <li>
              <a href="#" style={{ color: '#1A2258', fontWeight: 'bold' }}>About</a>
            </li>
            <li>
              <Link to="/contact" style={{ color: '#1A2258', fontWeight: 'bold' }}>Contact</Link>
            </li>
          </ul>
        </div>

        <div onClick={toggleSidebar}>
          <FontAwesomeIcon className={styles.bars} icon={faBars} size="2x" />
        </div>
      </div>

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
            <li
              key={index}
              className={`${styles.menuItem} ${isOpen ? styles['menu-item'] : ''}`}
            >
              {item === 'Home' ? (
                <Link to="/home" className={styles.menu}>{item}</Link>
              ) : item === 'Contact' ? (
                <Link to="/contact" className={styles.menu}>{item}</Link>
              ) : item === 'Logout' ? (
                <Link to="/" className={styles.menu}>{item}</Link>
              ) : (
                <a href="#" className={styles.menu}>{item}</a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Header;
