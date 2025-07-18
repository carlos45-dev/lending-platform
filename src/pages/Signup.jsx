import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import styles from '../styles/SignUp.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEyeSlash, faEye, faPhone, faUpRightFromSquare,faEnvelope, faEnvelopeCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

function Signup() {
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [responseTime, setResponseTime] = useState(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');

  const siteKey = "6LeZCXorAAAAAG7KhM3jjBoyWRANY4SE5AMh6rXF";
  const navigate = useNavigate();

  const handleRecaptchaChange = (value) => setRecaptchaValue(value);
  const handlePasswordToggle = () => setShowPassword(!showPassword);
  const handlePasswordToggle2 = () => setShowPassword2(!showPassword2);

  const validatePhoneNumber = (number) => {
    const phoneRegex = /^(\+?\d{10,15}|0\d{9})$/;
    return phoneRegex.test(number);
  };

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

    if (!validatePhoneNumber(phone)) {
      alert("Please enter a valid phone number.");
      return;
    }

    setIsLoading(true);
    const startTime = performance.now();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await sendEmailVerification(user);

      await setDoc(doc(db, "users", user.uid), {
        email,
        username,
        phone,
        gender,
        createdAt: new Date(),
        borrowerRating: 4.5,
      });

      const endTime = performance.now();
      setResponseTime(Math.round(endTime - startTime));

      navigate("/verify-email");

    } catch (error) {
      console.error("Signup error:", error.message);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h2 className={styles.title}>Get started with your account</h2>
      <div className={styles.signup}>
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className={styles.formGroup}>
            <input type="text" className={styles.input} placeholder="John Doe"
              value={username} onChange={(e) => setUsername(e.target.value)} required disabled={isLoading} />
            <FontAwesomeIcon className={styles["input-icon"]} icon={faUser} />
          </div>

          {/* Email */}
          <div className={styles.formGroup}>
            <input type="email" className={styles.input} placeholder="example1@gmail.com"
              value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isLoading} />
            <FontAwesomeIcon className={styles["input-icon"]} icon={faEnvelope} />
          </div>

          {/* Phone */}
          <div className={styles.formGroup}>
            <input type="tel" className={styles.input} placeholder="+265 9xxx xxxx"
              value={phone} onChange={(e) => setPhone(e.target.value)} required disabled={isLoading} />
            <FontAwesomeIcon className={styles["input-icon"]} icon={faPhone} />
          </div>

          {/* Password */}
          <div className={styles.formGroup}>
            <input type={showPassword ? "text" : "password"} className={styles.input} placeholder="Password"
              value={password} onChange={(e) => setPassword(e.target.value)} required disabled={isLoading} />
            <FontAwesomeIcon className={styles["input-icon2"]} icon={faLock} />
            <span className={styles["eye-container"]} onClick={handlePasswordToggle}>
              {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className={styles.formGroup}>
            <input type={showPassword2 ? "text" : "password"} className={styles.input} placeholder="Confirm Password"
              value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required disabled={isLoading} />
            <FontAwesomeIcon className={styles["input-icon2"]} icon={faLock} />
            <span className={styles["eye-container"]} onClick={handlePasswordToggle2}>
              {showPassword2 ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
            </span>
          </div>

          {/* Gender */}
          <div className={styles.gender}>
            {["male", "female", "other"].map((value) => (
              <div key={value} className={styles.gender2}>
                <input type="radio" name="gender" value={value} id={value}
                  onChange={(e) => setGender(e.target.value)} disabled={isLoading} />
                <label htmlFor={value} className={styles.label}>
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </label>
              </div>
            ))}
          </div>

          {/* Terms */}
          <div className={styles.checkbox}>
            <input className={styles.checkbox1} type="checkbox" id="terms" required disabled={isLoading} />
            <label htmlFor="terms" className={styles.label2}>
              I agree to the <Link to="/terms" style={{ textDecoration: 'none' }}>
                terms and conditions <FontAwesomeIcon icon={faUpRightFromSquare} style={{ fontWeight: '1px' }} />
              </Link>
            </label>
          </div>

          {/* reCAPTCHA */}
          <div className={styles.recaptchaWrapper}>
            <ReCAPTCHA sitekey={siteKey} onChange={handleRecaptchaChange} />
          </div>

          {/* Submit */}
          <button type="submit" className={styles.submit} disabled={!recaptchaValue || isLoading}>
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>

          {/* Response Time */}
          {responseTime !== null && (
            <p style={{ textAlign: "center", color: "#666", marginTop: "10px" }}>
              ⏱ Signup response time: {responseTime}ms
            </p>
          )}
        </form>
      </div>
    </>
  );
}

export default Signup;
