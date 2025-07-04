import '../styles/SignIn.css';
function SignIn(){
 return(
    <div className="signin-container">
        <h3>Sign In</h3>
        <form>
        <div className="form-group">
            <label htmlFor="email">Student Email:</label><br />
            <input type="email" id="email" name="email" required className='input' placeholder='Enter your email' />
        </div>
        <div className="form-group2">
            <label htmlFor="password">Password:</label><br />
            <input type="password" id="password" name="password" className='input' required  placeholder='Enter your password'/>
        </div>
        <button className='submit' type="submit">Sign In</button>
        </form>
    </div>
 )
}
export default SignIn