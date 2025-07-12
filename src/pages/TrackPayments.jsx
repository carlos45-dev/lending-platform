import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/TrackPayments.module.css';
import { useEffect } from 'react';

function TrackPayments() {
  useEffect(() => {
    const originalDisplay = document.body.style.display;
    document.body.style.display = 'block';
    return () => {
      document.body.style.display = originalDisplay;
    };
  }, []);

  return (
    <div className={styles.outer}>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.heading}>Track Your Payments</h1>
        <div className={styles.tableWrapper}>
          <table className={styles.paymentTable}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Reference</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2025-07-01</td>
                <td>Borrowed</td>
                <td>MK 50,000</td>
                <td className={styles.paid}>Paid</td>
                <td>REF123456</td>
              </tr>
              <tr>
                <td>2025-06-15</td>
                <td>Lent</td>
                <td>MK 30,000</td>
                <td className={styles.pending}>Pending</td>
                <td>REF123457</td>
              </tr>
              <tr>
                <td>2025-05-31</td>
                <td>Lent</td>
                <td>MK 20,000</td>
                <td className={styles.paid}>Paid</td>
                <td>REF123458</td>
              </tr>
              <tr>
                <td>2025-04-10</td>
                <td>Borrowed</td>
                <td>MK 10,000</td>
                <td className={styles.paid}>Paid</td>
                <td>REF123459</td>
              </tr>
              <tr>
                <td>2025-03-20</td>
                <td>Lent</td>
                <td>MK 40,000</td>
                <td className={styles.pending}>Pending</td>
                <td>REF123460</td>
              </tr>
              <tr>
                <td>2025-02-28</td>
                <td>Borrowed</td>
                <td>MK 60,000</td>
                <td className={styles.paid}>Paid</td>
                <td>REF123461</td>
              </tr>
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

export default TrackPayments;
