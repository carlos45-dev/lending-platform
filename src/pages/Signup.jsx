import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import styles from '../styles/SignUp.module.css';

function Signup() {
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const key = "6LeZCXorAAAAAG7KhM3jjBoyWRANY4SE5AMh6rXF";

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
    console.log("reCAPTCHA value:", value);
  };

  return (
    <>
      <h2>Get started with your account</h2>
      <div className={styles.signup}>
        <div className={styles.header}>
        </div>
        <form>
          <div className={styles.formGroup}>
            <input type="text" className={styles.input} placeholder="Username" />
          </div>

          <div className={styles.formGroup}>
            <input type="email" className={styles.input} placeholder="Email" />
          </div>

          <div className={styles.formGroup}>
            <input type="password" className={styles.input} placeholder="Password" />
          </div>

          <div className={styles.formGroup}>
            <input type="password" className={styles.input} placeholder="Confirm Password" />
          </div>

          <div className={styles.gender}>
            <input type="radio" name="gender" value="male" id="male" />
            <label htmlFor="male" className={styles.radio}>Male</label>

            <input type="radio" name="gender" value="female" id="female" />
            <label htmlFor="female" className={styles.radio}>Female</label>

            <input type="radio" name="gender" value="other" id="other" />
            <label htmlFor="other" className={styles.radio}>Other</label>
          </div>

          <div className={styles.checkbox}>
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">I agree to the terms and conditions of UniFund</label>
          </div>

        
          <div className={styles.recaptchaWrapper}>
            <ReCAPTCHA
              sitekey={key}
              onChange={handleRecaptchaChange}
            />
          </div>

          <button type="submit" className={styles.submit}>Sign Up</button>
        </form>
      </div>
    </>
  );
}

export default Signup;