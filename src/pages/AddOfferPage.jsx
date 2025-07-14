import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/AddOfferPage.module.css';

function AddOfferPage() {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [duration, setDuration] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const originalDisplay = document.body.style.display;
    document.body.style.display = 'block';
    return () => {
      document.body.style.display = originalDisplay;
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOffer = { amount, rate, duration };
    localStorage.setItem('newOffer', JSON.stringify(newOffer));
    navigate('/lend');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.formBox}>
        <h2>Add New Offer</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.group}>
            <label htmlFor="amount">Amount (MWK)</label>
            <input
              id="amount"
              type="number"
              placeholder="e.g. 400000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className={styles.group}>
            <label htmlFor="rate">Interest Rate (%)</label>
            <input
              id="rate"
              type="number"
              placeholder="e.g. 7.5"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              required
            />
          </div>
          <div className={styles.group}>
            <label htmlFor="duration">Duration (Weeks)</label>
            <input
              id="duration"
              type="number"
              placeholder="e.g. 2"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.submitBtn}>Submit Offer</button>
        </form>
      </div>
    </div>
  );
}

export default AddOfferPage;
