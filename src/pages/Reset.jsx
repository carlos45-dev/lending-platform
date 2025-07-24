import { useState, useEffect } from 'react';
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/reset.module.css';

function Reset() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNew, setConfirmNew] = useState('');

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const orig = document.body.style.display;
    document.body.style.display = 'block';
    return () => (document.body.style.display = orig);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNew) return alert('New passwords do not match.');
    if (!user?.email) return alert('User not logged in.');

    try {
      const cred = EmailAuthProvider.credential(user.email, oldPassword);
      await reauthenticateWithCredential(user, cred);
      await updatePassword(user, newPassword);
      alert('Password updated successfully!');
      navigate('/home');
    } catch (err) {
      console.error(err);
      alert('Error updating password: ' + err.message);
    }
  };

  const renderPasswordField = (id, label, value, setValue, visible, toggle) => (
    <div className={styles.group}>
      <label htmlFor={id}>{label}</label>
      <div className={styles.passwordWrapper}>
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          placeholder={`Enter ${label.toLowerCase()}`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
        <FontAwesomeIcon
          icon={visible ? faEyeSlash : faEye}
          className={styles.eyeIcon}
          onClick={toggle}
        />
      </div>
    </div>
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.formBox}>
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit} className={styles.form}>

          {renderPasswordField(
            'oldPassword',
            'Old Password',
            oldPassword,
            setOldPassword,
            showOld,
            () => setShowOld((v) => !v)
          )}

          {renderPasswordField(
            'newPassword',
            'New Password',
            newPassword,
            setNewPassword,
            showNew,
            () => setShowNew((v) => !v)
          )}

          {renderPasswordField(
            'confirmNew',
            'Confirm New Password',
            confirmNew,
            setConfirmNew,
            showConfirm,
            () => setShowConfirm((v) => !v)
          )}

          <button type="submit" className={styles.submitBtn}>
            Reset
          </button>
        </form>
      </div>
    </div>
  );
}

export default Reset;
