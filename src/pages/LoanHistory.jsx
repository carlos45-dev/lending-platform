import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/LoanHistory.module.css';
import { useEffect, useState } from 'react';
import { db } from '../firebase'; // adjust this path if needed
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function LoanHistory() {
  const [loanHistory, setLoanHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.display = 'block';

    const fetchUserLoans = async (uid) => {
      try {
        const loanRef = collection(db, 'loanHistory');
        const q = query(loanRef, where('userId', '==', uid));
        const snapshot = await getDocs(q);
        const loans = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLoanHistory(loans);
      } catch (error) {
        console.error('Error fetching loan history:', error);
      } finally {
        setLoading(false);
      }
    };

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserLoans(user.uid);
      } else {
        setLoading(false);
        console.warn("No user logged in");
      }
    });

    return () => {
      document.body.style.display = '';
      unsubscribe(); // cleanup auth listener
    };
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return date.toLocaleDateString('en-GB'); // You can localize this as needed
  };

  return (
    <div className={styles.outer}>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.heading}>Loan History</h1>
        <div className={styles.tableWrapper}>
          <table className={styles.paymentTable}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Reference</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4" style={{ textAlign: 'center' }}>Loading...</td></tr>
              ) : loanHistory.length > 0 ? (
                loanHistory.map((loan) => (
                  <tr key={loan.id}>
                    <td>{formatDate(loan.date)}</td>
                    <td>{loan.type}</td>
                    <td>MK {parseInt(loan.amount).toLocaleString()}</td>
                    <td>{loan.reference}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="4" style={{ textAlign: 'center' }}>No loan records found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.footerWrapper}>
        <div className={styles.footerContent}>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default LoanHistory;
