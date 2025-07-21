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
  updateDoc,
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
        progressWeeks: 1,
        amountPaid: 0,
        paidDate: null,
      });

      await logLoanHistory({
        type: 'lent',
        amount: loan.amount,
        reference: loan.id,
        userId: currentUser.uid,
      });

      await logLoanHistory({
        type: 'borrowed',
        amount: loan.amount,
        reference: loan.id,
        userId: loan.borrowerId,
      });

      await deleteDoc(doc(db, 'pendingLoans', loan.id));
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
      await deleteDoc(doc(db, 'pendingLoans', loan.id));
      setPendingLoans(prev => prev.filter(l => l.id !== loan.id));
      toast.success('Loan cancelled.');
    } catch (err) {
      toast.error('Could not cancel loan.');
    }
  };

  const confirmFullRepayment = async (loan) => {
    const now = new Date();
    const dueDate = loan.dueDate?.toDate();
    let borrowerRating = loan.borrowerRating || 3;

    if (loan.paidDate?.toDate() <= dueDate) {
      borrowerRating = Math.min(5, borrowerRating + 1);
    } else {
      borrowerRating = Math.max(1, borrowerRating - 1);
    }

    try {
      const userRef = doc(db, 'users', loan.borrowerId);
      await updateDoc(userRef, { borrowerRating: borrowerRating });

      await logLoanHistory({
        type: 'repaid',
        amount: loan.amount,
        reference: loan.id,
        userId: loan.borrowerId,
      });

      await deleteDoc(doc(db, 'activeLoans', loan.id));
      setActiveLoans(prev => prev.filter(l => l.id !== loan.id));

      toast.success("Loan fully repaid and confirmed.");
    } catch (err) {
      toast.error("Failed to confirm repayment.");
      console.error(err);
    }
  };

  const calculateTotalRepay = (loan) => {
    const principal = parseFloat(loan.amount);

    if (loan.interestBreakdown?.length > 0 && loan.progressWeeks) {
      const currentWeek = Math.min(loan.progressWeeks, loan.weeks);
      const rateObj = loan.interestBreakdown.find(item => item.week === currentWeek);
      const interestRate = rateObj ? parseFloat(rateObj.rate) : 0;
      const interestAmount = (principal * interestRate) / 100;
      return (principal + interestAmount).toFixed(2);
    }

    if (loan.interest) {
      return (principal * (1 + loan.interest / 100)).toFixed(2);
    }

    return principal.toFixed(2);
  };

  useEffect(() => {
    const originalDisplay = document.body.style.display;
    document.body.style.display = 'block';
    fetchPendingLoans();
    fetchActiveLoans();
    return () => {
      document.body.style.display = originalDisplay;
    };
  }, []);

  return (
    <>
      <div className={styles.dashboard}>
        <header className={styles.header}>
          <Header />
        </header>

        <h2 className={styles.title}>Track Payments</h2>

        <div className={styles.container}>
          <aside className={styles.sidebar}>
            <h3>Pending Loans</h3>
            {pendingLoans.length === 0 ? (
              <p className={styles.empty}>No pending loans.</p>
            ) : (
              pendingLoans.map((loan) => (
                <div key={loan.id} className={styles.card}>
                  <strong>{loan.borrowerName}</strong>
                  <p>Amount: MWK {loan.amount}</p>
                  <p>Weeks: {loan.weeks}</p>
                  <p>
                    Interest:{' '}
                    {loan.interestBreakdown?.length > 0
                      ? `${loan.interestBreakdown.map(item => `${item.rate}% (Week ${item.week})`).join(', ')}`
                      : loan.interest !== undefined
                      ? `${loan.interest}%`
                      : 'N/A'}
                  </p>
                  <p>Total Repay: MWK {calculateTotalRepay(loan)}</p>
                  <p>Date Borrowed: {loan.borrowedAt?.toDate().toDateString()}</p>
                  <div className={styles.actions}>
                    <button onClick={() => confirmAndTrack(loan)} className={styles.confirmBtn}>Confirm & Start</button>
                    <button onClick={() => cancelLoan(loan)} className={styles.cancelBtn}>Cancel</button>
                  </div>
                </div>
              ))
            )}
          </aside>

          <main className={styles.main}>
            <section className={styles.loanRequests}>
              <h3>Active Loans</h3>
              {activeLoans.length === 0 ? (
                <p className={styles.empty}>No active loans.</p>
              ) : (
                activeLoans.map((loan, index) => {
                  const totalRepay = calculateTotalRepay(loan);
                  const isFullyPaid = parseFloat(loan.amountPaid || 0) >= parseFloat(totalRepay);
                  const due = loan.dueDate?.toDate();
                  const overdue = due && new Date() > due;

                  return (
                    <div className={styles.card} key={index}>
                      <strong>{loan.borrowerName}</strong>
                      <p>Amount Paid: MWK {loan.amountPaid || 0}/{totalRepay}</p>
                      <p>Paid On: {loan.paidDate ? loan.paidDate.toDate().toDateString() : 'Not yet paid'}</p>
                      <p>
                        Interest Rate:{' '}
                        {loan.interestBreakdown?.length > 0 && loan.progressWeeks
                          ? (() => {
                              const rateObj = loan.interestBreakdown.find(item => item.week === loan.progressWeeks);
                              return rateObj ? `${rateObj.rate}% (Week ${rateObj.week})` : 'N/A';
                            })()
                          : loan.interest !== undefined
                          ? `${loan.interest}%`
                          : 'N/A'}
                      </p>
                      <p>Start: {loan.startDate?.toDate().toDateString()}</p>
                      <p>Due: {due?.toDateString()}</p>
                      <p>Progress: {loan.progressWeeks}/{loan.weeks} weeks</p>
                      {overdue && !isFullyPaid && <p className={styles.overdue}>⚠️ Overdue!</p>}

                      {isFullyPaid && (
                        <button className={styles.confirmBtn} onClick={() => confirmFullRepayment(loan)}>
                          Confirm Full Repayment
                        </button>
                      )}
                    </div>
                  );
                })
              )}
            </section>
          </main>
        </div>
      </div>

      <ToastContainer />
      <Footer className={styles.footer} />
    </>
  );
}

export default TrackPayments;
