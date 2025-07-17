import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/AddOfferPage.module.css';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useContext } from 'react';
import { UserContext } from '../UserContext';

function AddOfferPage() {
  const [amount, setAmount] = useState('');
  const [weeks, setWeeks] = useState([{ week: 1, rate: '' }]);
  const navigate = useNavigate();
  const { userData } = useContext(UserContext);

  useEffect(() => {
    const originalDisplay = document.body.style.display;
    document.body.style.display = 'block';
    return () => {
      document.body.style.display = originalDisplay;
    };
  }, []);

  const handleWeekChange = (index, value) => {
    const updated = [...weeks];
    updated[index].week = parseInt(value);
    setWeeks(updated);
  };

  const handleRateChange = (index, value) => {
    const updated = [...weeks];
    updated[index].rate = value;
    setWeeks(updated);
  };

  const addWeek = () => {
    setWeeks([...weeks, { week: weeks.length + 1, rate: '' }]);
  };

  const removeWeek = (index) => {
    const updated = weeks.filter((_, i) => i !== index);
    setWeeks(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || weeks.some(w => !w.rate)) {
      alert("Please fill all fields.");
      return;
    }
     

    const offerData = {
      amount,
      weeklyRates: weeks,
      lenderId: userData.uid,
      lenderEmail: userData.email,
      lenderUsername: userData.username || "Anonymous",
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, 'offers'), offerData);
      alert('Offer successfully posted!');
      navigate('/lend');
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to post offer. Please try again.");
    }
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

          <h4 style={{ marginTop: '10px' }}>Interest Per Week</h4>
          {weeks.map((entry, index) => (
            <div key={index} className={styles.group}>
              <label>Week {index + 1}</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="number"
                  placeholder="Week"
                  value={entry.week}
                  onChange={(e) => handleWeekChange(index, e.target.value)}
                  style={{ width: '70px' }}
                  required
                />
                <input
                  type="number"
                  placeholder="Interest %"
                  value={entry.rate}
                  onChange={(e) => handleRateChange(index, e.target.value)}
                  required
                />
                {weeks.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeWeek(index)}
                    style={{ background: 'red', color: 'white', border: 'none', padding: '4px 8px' }}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addWeek}
            style={{ marginTop: '10px', backgroundColor: '#1A2258', color: '#fff', border: 'none', padding: '6px 12px' }}
          >
            + Add Week
          </button>

          <button type="submit" className={styles.submitBtn}>
            Submit Offer
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddOfferPage;
