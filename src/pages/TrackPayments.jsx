import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/TrackPayments.module.css';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function TrackPayments() {

const navigate = useNavigate();

  useEffect(() => {
    const originalDisplay = document.body.style.display;
    document.body.style.display = 'block';
    return () => {
      document.body.style.display = originalDisplay;
    };
  }, []);

  const lentLoans = [
    { borrower: "John", total: 50000, paid: 35000 },
    { borrower: "Alice", total: 30000, paid: 30000 },
    { borrower: "Mike", total: 20000, paid: 5000 },
  ];

  const borrowedLoans = [
    { lender: "Sarah", amount: 40000, status: "Pending", date: "2025-07-10" },
    { lender: "Daniel", amount: 25000, status: "Paid", date: "2025-06-20" },
  ];

  const calculatePercentage = (paid, total) => Math.round((paid / total) * 100);

  return (
    <>
    <div className={styles.trackContainer}>
      <Header />
      <div className={styles.section}>
        <h2 className={styles.heading}>Loans You Borrowed</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.paymentTable}>
            <thead>
              <tr>
                <th>Lender</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {borrowedLoans.map((loan, idx) => (
                <tr key={idx}>
                  <td>{loan.lender}</td>
                  <td>MK {loan.amount.toLocaleString()}</td>
                  <td className={loan.status === 'Paid' ? styles.paid : styles.pending}>{loan.status}</td>
                  <td>{loan.date}</td>
                  <td>
                    {loan.status === "Pending" && (
                      <button className={styles.confirmBtn } onClick={() => navigate("/mark-paid")}>Mark as Paid</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.heading}>Loans You Lent</h2>
        {lentLoans.map((loan, idx) => {
          const percent = calculatePercentage(loan.paid, loan.total);
          return (
            <div key={idx} className={styles.skillBox}>
              <div className={styles.skillHeader}>
                <span>{loan.borrower}</span>
                <span>{percent}%</span>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${percent}%` }}></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.ratingSection}>
        <h2 className={styles.heading}>Your Trust Rating</h2>
        <div className={styles.stars}>
          ⭐⭐⭐⭐☆ 4.0 / 5
        </div>
      </div>
    </div>
    <div className={styles.footerWrapper}>
    <Footer />
  </div>
  </>
  );
}

export default TrackPayments;
