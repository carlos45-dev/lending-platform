import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../styles/AddOfferPage.module.css';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

function MarkPaid() {
  const location = useLocation();
  const navigate = useNavigate();
  const loan = location.state?.loan;

  const [amountPaid, setAmountPaid] = useState('');
  const [paidDate, setDatePaid] = useState('');

  useEffect(() => {
    const originalDisplay = document.body.style.display;
    document.body.style.display = 'block';
    return () => {
      document.body.style.display = originalDisplay;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loan?.id) {
      alert('Loan information not available.');
      return;
    }

    try {
      // Submit repayment to pendingRepayments collection
      await addDoc(collection(db, 'pendingRepayments'), {
        loanId: loan.id,
        amountPaid: parseFloat(amountPaid),
        paidDate,
        borrowerId: loan.borrowerId,
        lenderId: loan.lenderId,
        borrowerName: loan.borrowerName,
        submittedAt: new Date().toISOString(),
      });

      alert('Repayment submitted for lender approval.');
      navigate('/borrow');
    } catch (error) {
      console.error('Error submitting repayment:', error);
      alert('Failed to submit repayment.');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.formBox}>
        <h2>Confirm Repayment</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.group}>
            <label htmlFor="amountPaid">Amount Paid (MWK)</label>
            <input
              id="amountPaid"
              type="number"
              placeholder="e.g. 400000"
              value={amountPaid}
              onChange={(e) => setAmountPaid(e.target.value)}
              required
            />
          </div>

          <div className={styles.group}>
            <label htmlFor="datePaid">Date Paid</label>
            <input
              id="datePaid"
              type="date"
              value={paidDate}
              onChange={(e) => setDatePaid(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Submit Payment
          </button>
        </form>
      </div>
    </div>
  );
}

export default MarkPaid;