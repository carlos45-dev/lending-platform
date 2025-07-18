import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/View.module.css';
import user from "../assets/user.jfif";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function View() {
  const location = useLocation();
  const request = location.state?.request;

  useEffect(() => {
    const originalDisplay = document.body.style.display;
    document.body.style.display = 'block';
    return () => {
      document.body.style.display = originalDisplay;
    };
  }, []);

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
             <strong> Requested:</strong> MWK {request?.amount || "N/A"} for {request?.weeks || "N/A"} weeks
            </p>
            <p><strong>Loan ID:</strong> {request?.id || "N/A"}</p>
            <p><strong>Collateral:</strong> {request?.collateral || "N/A"}</p>
            <p><strong>Borrower Rating:</strong> {request?.borrowerRating || "N/A"}</p>
          </div>
          <div className={styles.btns}>
            <button className={styles.approve}>Approve Loan</button>
            <button className={styles.reject}>Reject</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default View;
