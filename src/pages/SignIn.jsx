import '../styles/SignIn.css';
import img from '../assets/favicon.ico';
function SignIn(){
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
            <input type="password" id="password" name="password" className='input' required  placeholder='Enter your password'/>
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