import { useState } from 'react';
import styles from '../styles/MarkAsPaid.module.css';
import { useNavigate } from "react-router-dom";

function MarkAsPaid({ onClose, onSubmit }) {


  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [screenshot, setScreenshot] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !date) {
      setError('Please fill in all required fields.');
      return;
    }

    const formData = {
      amount,
      date,
      screenshot,
    };

    onSubmit(formData);
  };

  const navigate = useNavigate();

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Mark Payment as Paid</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            Amount Paid (MK)*
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </label>

          <label>
            Date Paid*
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>

          <label>
            Upload Proof (Screenshot)
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setScreenshot(e.target.files[0])}
            />
          </label>

          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.actions}>
            <button type="button" onClick={() => navigate("/track-payments")} className={styles.cancel}>
              Cancel
            </button>
            <button type="submit" className={styles.submit}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MarkAsPaid;
