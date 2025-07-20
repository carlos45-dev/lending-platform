import styles from '../styles/TrackPayments.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { getAuth } from 'firebase/auth';
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
  Timestamp,
} from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TrackPayments() {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const [pendingLoans, setPendingLoans] = useState([]);
  const [activeLoans, setActiveLoans] = useState([]);

  const fetchPendingLoans = async () => {
    if (!currentUser) return;
    const q = query(collection(db, 'pendingLoans'), where('lenderId', '==', currentUser.uid));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(docSnap => ({
      id: docSnap.id,
      ...docSnap.data()
    }));
    setPendingLoans(data);
  };

  const fetchActiveLoans = async () => {
    if (!currentUser) return;
    const q = query(collection(db, 'activeLoans'), where('lenderId', '==', currentUser.uid));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(docSnap => ({
      id: docSnap.id,
      ...docSnap.data()
    }));
    setActiveLoans(data);
  };

  const logLoanHistory = async (entry) => {
    try {
      await addDoc(collection(db, 'loanHistory'), {
        ...entry,
        date: Timestamp.now(),
      });
    } catch (err) {
      console.error("Failed to write to loan history", err);
    }
  };

  const confirmAndTrack = async (loan) => {
    const today = Timestamp.now();
    const dueDate = Timestamp.fromDate(
      new Date(Date.now() + loan.weeks * 7 * 24 * 60 * 60 * 1000)
    );

    try {
      await addDoc(collection(db, 'activeLoans'), {
        ...loan,
        startDate: today,
        dueDate,
        progressWeeks: 0,
      });

      await logLoanHistory({
        type: 'lent',
        amount: loan.amount,
        reference: loan.borrowerName,
        userId: currentUser.uid,
      });

      await logLoanHistory({
        type: 'borrowed',
        amount: loan.amount,
        reference: currentUser.displayName || 'Lender',
        userId: loan.borrowerId,
      });

      console.log("Deleting loan with ID:", loan.id);
      const loanRef = doc(db, 'pendingLoans', loan.id);
      await deleteDoc(loanRef);
      setPendingLoans(prev => prev.filter(l => l.id !== loan.id));

      toast.success('Tracking started for ' + loan.borrowerName);
      fetchActiveLoans();
    } catch (err) {
      console.error(err);
      toast.error('Failed to start tracking.');
    }
  };

  const cancelLoan = async (loan) => {
    try {
      console.log("Cancelling loan with ID:", loan.id);
      const loanRef = doc(db, 'pendingLoans', loan.id);
      await deleteDoc(loanRef);
      setPendingLoans(prev => prev.filter(l => l.id !== loan.id));
      toast.success('Loan cancelled.');
    } catch (err) {
      toast.error('Could not cancel loan.');
      console.error("Delete error:", err);
    }
  };

  useEffect(() => {
    fetchPendingLoans();
    fetchActiveLoans();
  }, []);

  return (
    <>
      <Header />
      <div className={styles.trackContainer} style={{ paddingTop: '7rem' }}>
        <h2 className={styles.title}>Track Payments</h2>

        <section className={styles.section}>
          <h3>Pending Loans</h3>
          {pendingLoans.length === 0 ? (
            <p className={styles.empty}>No pending loans.</p>
          ) : (
            <div className={styles.grid} style={{ marginTop: '1rem' }}>
              {pendingLoans.map((loan) => (
                <div key={loan.id} className={styles.card}>
                  <strong>{loan.borrowerName}</strong>
                  <p>Amount: MWK {loan.amount}</p>
                  <p>Weeks: {loan.weeks}</p>
                  <p>Interest: {loan.interest}%</p>
                  <p>Total Repay: MWK {parseFloat(loan.amount) * (1 + loan.interest / 100)}</p>
                  <p>Date Borrowed: {loan.borrowedAt?.toDate().toDateString()}</p>
                  <div className={styles.actions}>
                    <button
                      onClick={() => confirmAndTrack(loan)}
                      className={styles.confirmBtn}
                    >
                      Confirm & Start
                    </button>
                    <button
                      onClick={() => cancelLoan(loan)}
                      className={styles.cancelBtn}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className={styles.section}>
          <h3>Active Loans</h3>
          {activeLoans.length === 0 ? (
            <p className={styles.empty}>No active loans.</p>
          ) : (
            <div className={styles.grid}>
              {activeLoans.map((loan) => {
                const now = Date.now();
                const due = loan.dueDate?.toDate();
                const overdue = due && now > due.getTime();

                return (
                  <div key={loan.id} className={styles.card}>
                    <strong>{loan.borrowerName}</strong>
                    <p>Amount Returned: MWK {loan.amount}</p>
                    <p>Weeks: {loan.weeks}</p>
                    <p>Interest: {loan.interest}%</p>
                    <p>Start: {loan.startDate?.toDate().toDateString()}</p>
                    <p>Due: {loan.dueDate?.toDate().toDateString()}</p>
                    <p>Progress: {loan.progressWeeks}/{loan.weeks} weeks</p>
                    {overdue && (
                      <p className={styles.overdue}>⚠️ Overdue! Decrease credit score.</p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
}

export default TrackPayments;
