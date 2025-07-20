import styles from '../styles/Lend.module.css';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

function BorrowPage() {
  const navigate = useNavigate();
  const { offers, currentUser } = useAuth();
  const [activeLoans, setActiveLoans] = useState([]);

  useEffect(() => {
    const originalDisplay = document.body.style.display;
    document.body.style.display = 'block';
    fetchActiveLoans();
    return () => {
      document.body.style.display = originalDisplay;
    };
  }, []);

  // In BorrowPage.jsx
const fetchActiveLoans = async () => {
    if (!currentUser) return;
    const q = query(collection(db, 'activeLoans'), where('borrowerId', '==', currentUser.uid));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => {
      const docData = doc.data(); 
      return {
        ...docData, 
        id: doc.id  
      };
    });
    console.log("Fetched active loans with correct IDs:", data); 
    setActiveLoans(data);
};


  const filteredOffers = offers.filter(
    (offer) => offer.lenderId !== currentUser?.uid
  );

  return (
    <>
      <div className={styles.dashboard}>
        <header className={styles.header}>
          <Header />
        </header>

        <h2 className={styles.title}>Find trusted fellow Students Lenders</h2>

        <div className={styles.container}>
          <aside className={styles.sidebar}>
            <h3>My Borrowed Loans</h3>
            {activeLoans.length === 0 ? (
              <p style={{ color: 'gray' }}>No active loans.</p>
            ) : (
              activeLoans.map((loan) => (
                <div className={styles.card} key={loan.id}>
                  <strong>Borrowed From: {loan.lenderUsername || 'N/A'}</strong>
                  <p>MWK {loan.amount} for {loan.weeks} weeks</p>
                  <p>Interest: {loan.interest}%</p>
                  <p>Start: {loan.startDate?.toDate().toDateString()}</p>
                  <p>Due: {loan.dueDate?.toDate().toDateString()}</p>
                  <button onClick={() => navigate("/mark-paid", { state: { loan } })}>Mark as Paid</button>
                </div>
              ))
            )}
          </aside>

          <main className={styles.main}>
            <section className={styles.loanRequests}>
              <h3>Offers Available</h3>
              {filteredOffers.length > 0 ? (
                filteredOffers.map((offer) => (
                  <div className={styles.card} key={offer.id}>
                    <strong>{offer.lenderUsername}</strong>
                    <p>
                      Offers Up To <span>MWK{offer.amount}</span> for{" "}
                      <span>
                        {offer.weeklyRates?.length || 1}{" "}
                        {(offer.weeklyRates?.length || 1) === 1 ? "week" : "weeks"}
                      </span>
                    </p>
                    <p><b>Interest Breakdown:</b></p>
                    <ul style={{ paddingLeft: "20px", marginTop: "4px" }}>
                      {offer.weeklyRates?.map((week, index) => (
                        <li key={index}>
                          Week {index + 1}: {week.rate}%
                        </li>
                      ))}
                    </ul>
                    <button onClick={() => navigate('/borrow-form', { state: { offer } })}>
                      Borrow
                    </button>
                  </div>
                ))
              ) : (
                <p style={{ color: 'gray' }}>No offers available at the moment.</p>
              )}
            </section>
          </main>
        </div>
      </div>
      <Footer className={styles.footer} />
    </>
  );
}

export default BorrowPage;
