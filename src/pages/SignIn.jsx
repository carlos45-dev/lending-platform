import '../styles/SignIn.css';
import img from '../assets/favicon.ico';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock,faEyeSlash,faEye } from '@fortawesome/free-solid-svg-icons';

import { useState } from 'react';

function SignIn() {
  const [showpassword, setShowPassword] = useState(false);

  const handlepasswordToggle = () => {
    setShowPassword(!showpassword);
  };

  return (
    <>
      <div className="header">
        <span className="logo">
      <img  src={img} alt="UniFund Logo" />
      </span>
      <h2 className="title">UniFund</h2>
      </div>
      <div className="signin-container">
        <h3>Sign In</h3>
        <form>
          <div className="form-group">
            <label htmlFor="email">Student Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="input"
              placeholder="Enter your email"
            />
            <FontAwesomeIcon className="input-icon" icon={faUser} />
          </div>

          <div className="form-group2">
            <label htmlFor="password">Password:</label>
            <input
              type={showpassword ? 'text' : 'password'}
              id="password"
              name="password"
              className="input"
              required
              placeholder="Enter your password"
            />
            <FontAwesomeIcon className="input-icon2" icon={faLock} />
            <span className="eye-container" onClick={handlepasswordToggle}>
              {showpassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
            </span>
           <a className="forgot">Forgot password?</a>
          </div>

          <button className="submit" type="submit">
            Sign In
          </button>
          <p className="signup">
            Don't have an account? <a className="signup">Sign Up</a>
          </p>
        </form>
      </div>
    </>
  );
}

export default SignIn;
