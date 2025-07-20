import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/View.module.css';
import user from "../assets/user.jfif";
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, setDoc, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function View() {
  const location = useLocation();
  const navigate = useNavigate();
  const request = location.state?.request;
  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const originalDisplay = document.body.style.display;
    document.body.style.display = 'block';
    return () => {
      document.body.style.display = originalDisplay;
    };
  }, []);

  const approveLoan = async () => {
    if (!request || !currentUser) return;

    const message = `Hey I'm ${currentUser.displayName || 'a lender'}, I want to approve the loan that you applied amounting MWK ${request.amount} for ${request.weeks} weeks.`;
    const phone = request.borrowerPhone?.replace(/\s+/g, '');

    const whatsappLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    const loanData = {
      ...request,
      lenderId: currentUser.uid,
      lenderName: currentUser.displayName || 'Lender',
      borrowedAt: Timestamp.now(),
    };

    try {
      await setDoc(doc(db, 'pendingLoans', request.id), loanData);
      await deleteDoc(doc(db, 'loanRequests', request.id));
      window.open(whatsappLink, '_blank');
      toast.success('Loan approved and borrower notified via WhatsApp!');
      navigate('/lend');
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong while approving the loan.');
    }
  };

  const rejectLoan = async () => {
    if (!request) return;

    try {
      await deleteDoc(doc(db, 'loanRequests', request.id));
      toast.info('Loan request rejected and removed.');
      navigate('/lend');
    } catch (err) {
      console.error(err);
      toast.error('Failed to reject the loan request.');
    }
  };

  return (
    <>
      <Header />
      <div className={styles.viewContainer}>
        <div className={styles.top}>
          <img src={user} className={styles.img} />
          <div>
            <p className={styles.title}>
              {request?.borrowerName || "Borrower Name"}
            </p>
          </div>
        </div>

        <div className={styles.details}>
          <div className={styles.info}>
            <p className={styles.para}>
              <strong>Requested:</strong> MWK {request?.amount || "N/A"} for {request?.weeks || "N/A"} weeks
            </p>
            <p><strong>Loan ID:</strong> {request?.id || "N/A"}</p>
            <p><strong>Collateral:</strong> {request?.collateral || "N/A"}</p>
            <p><strong>Borrower Rating:</strong> {request?.borrowerRating || "N/A"}</p>
            <p><strong>Phone:</strong> {request?.borrowerPhone || "N/A"}</p>
          </div>

          <div className={styles.btns}>
            <button onClick={approveLoan} className={styles.approve}>Approve Loan</button>
            <button onClick={rejectLoan} className={styles.reject}>Reject</button>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
}

export default View;
