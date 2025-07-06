import { useEffect } from 'react';
import styles from '../styles/SignUp.module.css';


function Signup() {

    useEffect(() => {
        document.title = "Sign Up";
        document.body.style.backgroundColor = "#f0f0f0";
     } , []);


  return (
    <div className={styles.signup}>
      <div className={styles.header}>
        <h1>Sign Up</h1>
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
                <input type="radio" name="gender" value="male" id ="male" />
                <label for="male" className={styles.radio}>Male</label>

                <input type="radio" name="gender" value="other" id ="female" />
                <label for="female" className={styles.radio}>Female</label>

                <input type="radio" name="gender" value="other" id ="other" />
                <label for="other" className={styles.radio}>Other</label>
        </div>

        <div className={styles.checkbox}>
          <input type="checkbox" id="terms" />
          <label for="terms">I agree to the terms and conditions</label>
        </div>

        <button type="submit" className={styles.submit}>Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
