import styles from '../styles/SignIn.module.css';
import img from '../assets/favicon.ico';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function SignIn() {

  const [showpassword, setShowPassword] = useState(false);

  const handlepasswordToggle = () => {
    setShowPassword(!showpassword);
  };

  return (
    <>
      <div className={styles.header}>
        <span className={styles.logo}>
          <img src={img} alt="UniFund Logo" />
        </span>
        <h2 className={styles.title}>UniFund</h2>
      </div>

      <div className={styles['signin-container']}>
        <h3>Sign In</h3>
        <form>
          <div className={styles['form-group']}>
            <label htmlFor="email">Student Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className={styles.input}
              placeholder="Enter your email"
            />
            <FontAwesomeIcon className={styles['input-icon']} icon={faUser} />
          </div>

          <div className={styles['form-group2']}>
            <label htmlFor="password">Password:</label>
            <input
              type={showpassword ? 'text' : 'password'}
              id="password"
              name="password"
              required
              className={styles.input}
              placeholder="Enter your password"
            />
            <FontAwesomeIcon className={styles['input-icon2']} icon={faLock} />
            <span className={styles['eye-container']} onClick={handlepasswordToggle}>
              {showpassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
            </span>
            <a className={styles.forgot}>Forgot password?</a>
          </div>

          <button className={styles.submit} type="submit">
            Sign In
          </button>

          <p className={styles.signup}>
            Don't have an account? <Link to="/signup" className={styles.signup}>Sign Up</Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default SignIn;
