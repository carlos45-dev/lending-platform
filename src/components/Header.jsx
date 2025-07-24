import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faBars } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import styles from '../styles/Header.module.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const scrollToServices = () => {
    const scroll = () => {
      const section = document.getElementById('services');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        closeSidebar();
      }
    };
    if (location.pathname !== '/home') {
      navigate('/home');
      setTimeout(scroll, 300);
    } else {
      scroll();
    }
  };

  const menuItems = ['Home', 'Services', 'About', 'Contact', 'Logout'];

  return (
    <>
      <div className={`${styles.header} ${scrolled ? styles.scrolled : styles.initial}`}>
        <Link to="/profile" className={styles.user}>
          <FontAwesomeIcon icon={faCircleUser} size="2x" />
        </Link>

        <h2 className={styles.title}>UniFund</h2>

        <ul className={styles.nav}>
          <li><Link to="/home" className={styles.menu} style={{fontWeight:'bold'}}>Home</Link></li>
          <li><button onClick={scrollToServices} className={styles.menu} >Services</button></li>
          <li><Link to="/about" className={styles.menu} style={{fontWeight:'bold'}}>About</Link></li>
          <li><Link to="/contact" className={styles.menu} style={{fontWeight:'bold'}}>Contact</Link></li>
        </ul>

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
            zIndex: 998,
          }}
        ></div>
      )}

      <div
        className={`${styles.sidebar} ${isOpen ? styles.show : ''} ${
          scrolled ? styles.darkSidebar : styles.lightSidebar
        }`}
      >
        <ul className={styles.mainmenu}>
          {menuItems.map((item, index) => (
            <li key={index} className={styles.menuItem}>
              {item === 'Services' ? (
                <button onClick={scrollToServices} className={styles.menu}>
                  {item}
                </button>
              ) : (
                <Link
                  to={item === 'Logout' ? '/' : `/${item.toLowerCase()}`}
                  className={styles.menu}
                  onClick={closeSidebar}
                >
                  {item}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Header;
