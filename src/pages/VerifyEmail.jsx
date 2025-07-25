import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

function VerifyEmail() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [resendMessage, setResendMessage] = useState(null);

  // Check email verification status
  const checkEmailVerification = async () => {
    try {
      if (!auth.currentUser) {
        console.log('No user is signed in.');
        setError('No user is signed in. Please sign in again.');
        return;
      }

      // Refresh user data and token
      await auth.currentUser.reload();
      await auth.currentUser.getIdToken(true); // Force token refresh
      console.log('Email verified:', auth.currentUser.emailVerified);

      if (auth.currentUser.emailVerified) {
        navigate('/home');
      }
    } catch (err) {
      console.error('Error checking email verification:', err);
      setError('Failed to check verification status. Please try again.');
    }
  };



  useEffect(() => {
    // Initial check on mount
    checkEmailVerification();

    // Poll every 5 seconds (increased from 3s to reduce load)
    const interval = setInterval(checkEmailVerification, 5000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>📧 Please verify your email</h2>
      <p>We've sent a verification link to your email address.</p>
      <p>Please check your <strong>Spam</strong> or <strong>Promotions</strong> folder if you don't see it.</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {resendMessage && <p style={{ color: 'green' }}>{resendMessage}</p>}
    </div>
  );
}

export default VerifyEmail;