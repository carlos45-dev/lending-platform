import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

function VerifyEmail() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkEmailVerification = async () => {
      await auth.currentUser.reload(); // refresh user data
      if (auth.currentUser?.emailVerified) {
        navigate("/home");
      }
    };

    const interval = setInterval(checkEmailVerification, 3000); // check every 3s

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>📧 Please verify your email</h2>
      <p>We've sent a verification link to your email address.</p>
      <p>Once verified, you'll be automatically redirected to your dashboard.</p>
    </div>
  );
}

export default VerifyEmail;
