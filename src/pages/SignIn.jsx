import styles from '../styles/SignIn.module.css';
import img from '../assets/favicon.ico';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [responseTime, setResponseTime] = useState(null);
  const navigate = useNavigate();

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const startTime = performance.now();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 🚫 Prevent login if email not verified
      if (!user.emailVerified) {
        alert("Please verify your email address before logging in.");
        setIsLoading(false);
        return;
      }

      // ✅ Load Firestore user profile
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        console.log("User profile:", userData);
      } else {
        console.log("No profile found in Firestore.");
      }

      const endTime = performance.now();
      setResponseTime(Math.round(endTime - startTime));
      navigate("/home");

    } catch (error) {
      console.error("Error signing in:", error.message);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.logo}>
          <img src={img} alt="UniFund Logo" />
        </span>
        <h2 className={styles.title}>UniFund</h2>
      </div>

      <div className={styles['signin-container']}>
        <h3>Sign In</h3>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className={styles['form-group']}>
            <label htmlFor="email">Student Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className={styles.input}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
            <FontAwesomeIcon className={styles['input-icon']} icon={faUser} />
          </div>

          {/* Password */}
          <div className={styles['form-group2']}>
            <label htmlFor="password">Password:</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              required
              className={styles.input}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
            <FontAwesomeIcon className={styles['input-icon2']} icon={faLock} />
            <span className={styles['eye-container']} onClick={handlePasswordToggle}>
              {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
            </span>
            <a className={styles.forgot}>Forgot password?</a>
          </div>

          {/* Submit */}
          <button className={styles.submit} type="submit" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </button>

          {/* Response Time */}
          {responseTime !== null && (
            <p style={{ textAlign: "center", color: "#888", marginTop: "10px" }}>
              ⏱ Response time: {responseTime}ms
            </p>
          )}

          <p className={styles.signup}>
            Don't have an account? <Link to="/signup" className={styles.signup}>Sign Up</Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default SignIn;
