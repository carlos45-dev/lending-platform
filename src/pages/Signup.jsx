import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import styles from '../styles/SignUp.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

function Signup() {
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const key = "6LeZCXorAAAAAG7KhM3jjBoyWRANY4SE5AMh6rXF";

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

    const handlePasswordToggle2 = () => {
    setShowPassword2(!showPassword2);
  };


  return (
    <>
      <h2 style={{ textAlign: 'center', marginBottom: '60px', fontSize: '1.2rem' }}>Get started with your account</h2>
      <div className={styles.signup}>
        <form>
          <div className={styles.formGroup}>
            <input type="text" className={styles.input} placeholder="Username" required />
            <FontAwesomeIcon className={styles["input-icon"]} icon={faUser} />
          </div>

          <div className={styles.formGroup}>
            <input type="email" className={styles.input} placeholder="Email" required />
            <FontAwesomeIcon className={styles["input-icon"]} icon={faUser} />
          </div>

          <div className={styles.formGroup}>
            <input
              type={showPassword ? "text" : "password"}
              className={styles.input}
              placeholder="Password"
              required
            />
            <FontAwesomeIcon className={styles["input-icon2"]} icon={faLock} />
            <span className={styles["eye-container"]} onClick={handlePasswordToggle}>
              {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
            </span>
          </div>

          <div className={styles.formGroup}>
            <input
              type={showPassword2 ? "text" : "password"}
              className={styles.input}
              placeholder="Confirm Password"
              required
            />
            <FontAwesomeIcon className={styles["input-icon2"]} icon={faLock} />
            <span className={styles["eye-container"]} onClick={handlePasswordToggle2}>
              {showPassword2 ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
            </span>
          </div>

          <div className={styles.gender}>
            <div className={styles.gender2}>
              <input type="radio" name="gender" value="male" id="male" />
              <label htmlFor="male" className={styles.label}>Male</label>
            </div>

            <div className={styles.gender2}>
              <input type="radio" name="gender" value="female" id="female" />
              <label htmlFor="female" className={styles.label}>Female</label>
            </div>

            <div className={styles.gender2}>
              <input type="radio" name="gender" value="other" id="other" />
              <label htmlFor="other" className={styles.label}>Other</label>
            </div>
          </div>

          <div className={styles.checkbox}>
            <input className={styles.checkbox1} type="checkbox" id="terms" required />
            <label htmlFor="terms" className={styles.label2}>
              I agree to the terms and conditions 
            </label>
          </div>

          <div className={styles.recaptchaWrapper}>
            <ReCAPTCHA sitekey={key} onChange={handleRecaptchaChange} />
          </div>

          <button type="submit" className={styles.submit}>Sign Up</button>
        </form>
      </div>
    </>
  );
}

export default Signup;
