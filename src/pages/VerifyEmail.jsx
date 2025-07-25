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

  // Resend verification email
  const handleResendEmail = async () => {
    try {
      if (!auth.currentUser) {
        setError('No user is signed in. Please sign in again.');
        return;
      }
      await auth.currentUser.sendEmailVerification();
      setResendMessage('Verification email resent. Please check your inbox.');
    } catch (err) {
      console.error('Error resending verification email:', err);
      setError('Failed to resend verification email. Please try again.');
    }
  };

  // Manual verification check
  const handleManualCheck = async () => {
    await checkEmailVerification();
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
      <div style={{ marginTop: '1rem' }}>
        <button
          onClick={handleResendEmail}
          style={{ marginRight: '1rem', padding: '0.5rem 1rem' }}
        >
          Resend Verification Email
        </button>
        <button
          onClick={handleManualCheck}
          style={{ padding: '0.5rem 1rem' }}
        >
          Check Verification Status
        </button>
      </div>
    </div>
  );
}

export default VerifyEmail;