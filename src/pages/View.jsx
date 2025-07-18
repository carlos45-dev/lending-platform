import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/View.module.css';
import user from "../assets/user.jfif";
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../firebase'; // Adjust this path as needed
import { doc, deleteDoc } from 'firebase/firestore';

function View() {
  const location = useLocation();
  const navigate = useNavigate();
  const request = location.state?.request;

  useEffect(() => {
    const originalDisplay = document.body.style.display;
    document.body.style.display = 'block';
    return () => {
      document.body.style.display = originalDisplay;
    };
  }, []);

  const handleApprove = () => {
    if (!request?.borrowerPhone) {
      alert("Borrower phone number is missing.");
      return;
    }

    const message = `Hey, I'm ${request?.lenderUsername}. I want to approve the loan that you applied for, amounting to MWK ${request?.amount} for ${request?.weeks} weeks.`;
    const encodedMessage = encodeURIComponent(message);
    const phone = request.borrowerPhone.replace(/\D/g, ''); // remove non-digits
    const whatsappURL = `https://wa.me/${phone}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };

  const handleReject = async () => {
    try {
      if (!request?.id) {
        alert("Loan request ID is missing.");
        return;
      }
      await deleteDoc(doc(db, 'loanRequests', request.id));
      alert("Loan request rejected and deleted.");
      navigate("/lend");
    } catch (error) {
      console.error("Error deleting document:", error);
      alert("Failed to reject loan. Try again.");
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
            <button className={styles.approve} onClick={handleApprove}>
              Approve Loan
            </button>
            <button className={styles.reject} onClick={handleReject}>
              Reject
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default View;
