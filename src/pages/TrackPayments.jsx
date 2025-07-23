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
  getDoc,
} from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TrackPayments() {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const [pendingLoans, setPendingLoans] = useState([]);
  const [activeLoans, setActiveLoans] = useState([]);
  const [pendingRepayments, setPendingRepayments] = useState([]);

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
      ...docSnap.data(),
      id: docSnap.id    
    }));
    setActiveLoans(data);
  };

  const fetchPendingRepayments = async () => {
    if (!currentUser) return;
    const q = query(collection(db, 'pendingRepayments'), where('lenderId', '==', currentUser.uid));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(docSnap => ({
      id: docSnap.id,
      ...docSnap.data()
    }));
    setPendingRepayments(data);
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
        lastProgressUpdate: Timestamp.now(),
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

  const acceptRepayment = async (repayment) => {
    try {
      const loanRef = doc(db, 'activeLoans', repayment.loanId);
      const loanSnap = await getDoc(loanRef);

      if (!loanSnap.exists()) {
        throw new Error('Loan document does not exist');
      }

      const data = loanSnap.data();
      const existingAmount = parseFloat(data.amountPaid) || 0;
      const totalAmountPaid = existingAmount + parseFloat(repayment.amountPaid);

      // Convert repayment.paidDate (string) to Firestore Timestamp
      const paidDate = Timestamp.fromDate(new Date(repayment.paidDate));

      await updateDoc(loanRef, {
        amountPaid: totalAmountPaid,
        paidDate,
      });

      await logLoanHistory({
        type: 'repaid',
        amount: repayment.amountPaid,
        reference: repayment.loanId,
        userId: repayment.borrowerId,
      });

      await deleteDoc(doc(db, 'pendingRepayments', repayment.id));
      setPendingRepayments(prev => prev.filter(r => r.id !== repayment.id));
      toast.success('Repayment accepted and updated.');
      fetchActiveLoans();
    } catch (err) {
      console.error('Error accepting repayment:', err.message);
      toast.error(`Failed to accept repayment: ${err.message}`);
    }
  };

  const rejectRepayment = async (repayment) => {
    try {
      await deleteDoc(doc(db, 'pendingRepayments', repayment.id));
      setPendingRepayments(prev => prev.filter(r => r.id !== repayment.id));
      toast.success('Repayment rejected.');
    } catch (err) {
      console.error('Error rejecting repayment:', err);
      toast.error('Failed to reject repayment.');
    }
  };

  const confirmFullRepayment = async (loan) => {
    const docId = loan.id;
    const now = new Date();
    const dueDate = loan.dueDate?.toDate();
    let borrowerRating = loan.borrowerRating || 3;

    if (loan.paidDate) {
      const paidDate = loan.paidDate instanceof Timestamp ? loan.paidDate.toDate() : new Date(loan.paidDate);
      if (paidDate <= dueDate) {
        borrowerRating = Math.min(5, borrowerRating + 1);
      } else {
        borrowerRating = Math.max(1, borrowerRating - 1);
      }
    }

    try {
      const userRef = doc(db, 'users', loan.borrowerId);
      await updateDoc(userRef, { borrowerRating });

      await logLoanHistory({
        type: 'repaid',
        amount: loan.amount,
        reference: docId,
        userId: loan.borrowerId,
      });

      await deleteDoc(doc(db, 'activeLoans', docId));
      setActiveLoans(prev => prev.filter(l => l.id !== docId));
      toast.success("Loan fully repaid and confirmed.");
    } catch (err) {
      toast.error("Failed to confirm repayment.");
      console.error("Full Repayment Error:", err);
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
    const interval = setInterval(() => {
      setActiveLoans(prevLoans =>
        prevLoans.map(loan => {
          const lastUpdate = loan.lastProgressUpdate?.toDate();
          const now = new Date();
          if (!lastUpdate || (now - lastUpdate) >= 7 * 24 * 60 * 60 * 1000) {
            if (loan.progressWeeks < loan.weeks) {
              const updatedLoan = { ...loan, progressWeeks: loan.progressWeeks + 1, lastProgressUpdate: Timestamp.now() };
              const docRef = doc(db, 'activeLoans', loan.id);
              updateDoc(docRef, {
                progressWeeks: updatedLoan.progressWeeks,
                lastProgressUpdate: updatedLoan.lastProgressUpdate,
              });
              return updatedLoan;
            }
          }
          return loan;
        })
      );
    }, 24 * 60 * 60 * 1000); // Check daily

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.body.style.display = 'block';
    fetchPendingLoans();
    fetchActiveLoans();
    fetchPendingRepayments();
    return () => {
      document.body.style.display = 'none';
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
            <h3>Pending Repayments</h3>
            {pendingRepayments.length === 0 ? (
              <p className={styles.empty}>No pending repayments.</p>
            ) : (
              pendingRepayments.map((repayment) => (
                <div key={repayment.id} className={styles.card}>
                  <strong>{repayment.borrowerName}</strong>
                  <p>Loan ID: {repayment.loanId}</p>
                  <p>Amount Paid: MWK {repayment.amountPaid}</p>
                  <p>Date Paid: {new Date(repayment.paidDate).toDateString()}</p>
                  <p>Submitted: {new Date(repayment.submittedAt).toDateString()}</p>
                  <div className={styles.actions}>
                    <button onClick={() => acceptRepayment(repayment)} className={styles.confirmBtn}>Accept</button>
                    <button onClick={() => rejectRepayment(repayment)} className={styles.cancelBtn}>Reject</button>
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
                activeLoans.map((loan) => {
                  const totalRepay = calculateTotalRepay(loan);
                  const isFullyPaid = parseFloat(loan.amountPaid || 0) >= parseFloat(totalRepay);
                  const due = loan.dueDate?.toDate();
                  const overdue = due && new Date() > due;

                  return (
                    <div className={styles.card} key={loan.id}>
                      <strong>{loan.borrowerName}</strong>
                      <p>Amount Paid: MWK {loan.amountPaid || 0}/{totalRepay}</p>
                      <p>
                        Paid On:{' '}
                        {loan.paidDate
                          ? (loan.paidDate instanceof Timestamp
                              ? loan.paidDate.toDate()
                              : new Date(loan.paidDate)
                            ).toDateString()
                          : 'Not yet paid'}
                      </p>
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