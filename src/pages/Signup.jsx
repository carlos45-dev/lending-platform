import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import styles from '../styles/SignUp.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEyeSlash, faEye, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword,onAuthStateChanged  } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');

  const siteKey = "6LeZCXorAAAAAG7KhM3jjBoyWRANY4SE5AMh6rXF";

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  const handlePasswordToggle = () => setShowPassword(!showPassword);
  const handlePasswordToggle2 = () => setShowPassword2(!showPassword2);

  const navigate = useNavigate(); 

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!recaptchaValue) {
    alert("Please complete the reCAPTCHA.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      email,
      username,
      phone,
      gender,
      createdAt: new Date()
    });

    //REDIRECT A USER AFTER A SUCESSFUL LOGIN
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/home");
      }
    }) 

  } catch (error) {
    console.error("Signup error:", error.message);
    alert(error.message);
  }
};

  return (
    <>
      <h2 className={styles.title}>Get started with your account</h2>
      <div className={styles.signup}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <input
              type="text"
              className={styles.input}
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <FontAwesomeIcon className={styles["input-icon"]} icon={faUser} />
          </div>

          <div className={styles.formGroup}>
            <input
              type="email"
              className={styles.input}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FontAwesomeIcon className={styles["input-icon"]} icon={faUser} />
          </div>

          <div className={styles.formGroup}>
            <input
              type="tel"
              className={styles.input}
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <FontAwesomeIcon className={styles["input-icon"]} icon={faPhone} />
          </div>

          <div className={styles.formGroup}>
            <input
              type={showPassword ? "text" : "password"}
              className={styles.input}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <FontAwesomeIcon className={styles["input-icon2"]} icon={faLock} />
            <span className={styles["eye-container"]} onClick={handlePasswordToggle2}>
              {showPassword2 ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
            </span>
          </div>

          {/* Gender Selection */}
          <div className={styles.gender}>
            {["male", "female", "other"].map((value) => (
              <div key={value} className={styles.gender2}>
                <input
                  type="radio"
                  name="gender"
                  value={value}
                  id={value}
                  onChange={(e) => setGender(e.target.value)}
                />
                <label htmlFor={value} className={styles.label}>
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </label>
              </div>
            ))}
          </div>

          <div className={styles.checkbox}>
            <input className={styles.checkbox1} type="checkbox" id="terms" required />
            <label htmlFor="terms" className={styles.label2}>
              I agree to the <Link to="/terms" style={{ textDecoration: 'none' }}>terms and conditions</Link>
            </label>
          </div>

          <div className={styles.recaptchaWrapper}>
            <ReCAPTCHA sitekey={siteKey} onChange={handleRecaptchaChange} />
          </div>

          <button type="submit" className={styles.submit} disabled={!recaptchaValue}>
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}

export default Signup;
