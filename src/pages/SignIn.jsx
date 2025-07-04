import '../styles/SignIn.css';
import img from '../assets/favicon.ico';
import eye from '../assets/eye.png';
import eye2 from '../assets/eye2.png';

import { useState } from 'react';
function SignIn(){
    
    // State to manage password visibility
    const[showpassword, setShowPassword] = useState(false);
    
    // Function to toggle password visibility
    const handlepasswordToggle = () => {
        setShowPassword(!showpassword);
    }
    

 return(
    <>
      <img  className='logo' src={img} alt="UniFund Logo" />
    <div className="signin-container">
        <h3>Sign In</h3>
        <form>
            
        <div className="form-group">
            <label htmlFor="email">Student Email:</label>
            <input type="email" id="email" name="email" required className='input' placeholder='Enter your email' />
        </div>

        <div className="form-group2">
            <label htmlFor="password">Password:</label>
            <input type={showpassword ? "text" : "password"} id="password" name="password" className='input' required  placeholder='Enter your password'/>
            <span className='eye-container' onClick={handlepasswordToggle}>
           <img className='eye' src={showpassword ? eye : eye2} alt="eye icon" />
            </span>
            <a className='forgot' >Forgot password?</a>
        </div>
        <button className='submit' type="submit">Sign In</button>
        <p className='signup'>Don't have an account ? <a className='signup'>Sign Up</a></p>
        </form>
    </div>
    <p className='unifund'>UniFund</p>
    </>
 )
}
export default SignIn