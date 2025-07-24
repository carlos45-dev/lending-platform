import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import styles from '../styles/BorrowForm.module.css';

function BorrowForm() {
  const [amount, setAmount] = useState('');
  const [weeks, setWeeks] = useState('');
  const [collateral, setCollateral] = useState('');
  const [borrowerRating, setBorrowerRating] = useState(null);
  const [borrowerName, setBorrowerName] = useState('');
  const [borrowerPhone, setBorrowerPhone] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const offer = location.state?.offer;
  const currentUser = getAuth().currentUser;

  useEffect(() => {
    const originalDisplay = document.body.style.display;
    document.body.style.display = 'block';
    return () => {
      document.body.style.display = originalDisplay;
    };
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const docRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setBorrowerRating(data.borrowerRating || 0);
            setBorrowerName(data.username || currentUser.email);
            setBorrowerPhone(data.phone || "N/A");
          } else {
            console.warn("User document not found.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserData();
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !weeks || !collateral) {
      alert('Please fill in all fields.');
      return;
    }

    if (!offer) {
      alert("No offer selected.");
      return;
    }

    if (parseFloat(amount) > parseFloat(offer.amount)) {
      alert(`You cannot request more than ${offer.amount}`);
      return;
    }

    if (parseInt(weeks) > parseInt(offer.weeklyRates.length)) {
      alert(`You cannot request more than ${offer.weeklyRates.length} weeks`);
      return;
    }

    const requestData = {
      amount,
      weeks,
      collateral,
      interestBreakdown: offer.weeklyRates || {}, 
      borrowerId: currentUser.uid,
      borrowerEmail: currentUser.email,
      borrowerName: borrowerName || "Anonymous",
      borrowerPhone: borrowerPhone || "N/A",
      borrowerRating: borrowerRating || 0,
      lenderId: offer.lenderId,
      lenderEmail: offer.lenderEmail,
      lenderUsername: offer.lenderUsername,
      status: 'pending',
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, 'loanRequests'), requestData);
      alert('Loan request sent successfully!');
      navigate('/borrow');
    } catch (error) {
      console.error("Error submitting loan request:", error);
      alert('Something went wrong. Please try again.');
    }
  };

  if (!offer) return <div className={styles.wrapper}><h2>Invalid access: No offer selected.</h2></div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.formBox}>
        <h2>Borrow Money</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.group}>
            <label htmlFor="amount">Amount (max MKW{offer.amount})</label>
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
            <label htmlFor="weeks">Number of Weeks (max {offer.weeklyRates.length})</label>
            <input
              id="weeks"
              type="number"
              placeholder="e.g. 4"
              value={weeks}
              onChange={(e) => setWeeks(e.target.value)}
              required
            />
          </div>

          <div className={styles.group}>
            <label htmlFor="collateral">Collateral Offered</label>
            <input
              id="collateral"
              type="text"
              placeholder="e.g. Laptop, ID, Phone"
              value={collateral}
              onChange={(e) => setCollateral(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Send Request
          </button>
        </form>
      </div>
    </div>
  );
}

export default BorrowForm;
