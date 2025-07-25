import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

function VerifyEmail() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check email verification status
    const checkEmailVerification = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.log('No user is signed in.');
          navigate('/', { replace: true }); // Redirect to sign-in
          return;
        }

        // Refresh user data
        await user.reload();
        const { emailVerified } = user;

        if (emailVerified) {
          console.log('Email verified, navigating to /home');
          navigate('/home', { replace: true }); // Replace history to prevent back button issues
        }
      } catch (err) {
        console.error('Error checking email verification:', err);
        setError('Failed to check verification status. Please try again.');
      }
    };

    // Initial check on mount
    checkEmailVerification();

    // Poll every 5 seconds
    const interval = setInterval(checkEmailVerification, 5000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>📧 Please verify your email</h2>
      <p>We've sent a verification link to your email address.</p>
      <p>Please check your <strong>Spam</strong> or <strong>Promotions</strong> folder if you don't see it.</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default VerifyEmail;