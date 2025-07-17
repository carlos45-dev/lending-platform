import styles from '../styles/Lend.module.css';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; 

function BorrowPage() {
  const navigate = useNavigate();
  const { offers, currentUser } = useAuth(); 

  useEffect(() => {
    const originalDisplay = document.body.style.display;
    document.body.style.display = 'block';

    return () => {
      document.body.style.display = originalDisplay;
    };
  }, []);

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
            <h3>My Loan Summary</h3>
            <ul>
              <li>Completed Loans <b style={{ color: 'green' }}>(2)</b></li>
              <li>Overdue Loan <b style={{ color: 'red' }}>(1)</b></li>
            </ul>
          </aside>

          <main className={styles.main}>
            <section className={styles.loanRequests}>
              {/*displaying the loans available*/}
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
                    <button>Borrow</button>
                  </div>
                ))
              ) : (
                <p style={{ color: 'gray' }}>No offers available at the moment.</p>
              )}
            </section>
            {/*displaying active loans */}
            <section className={styles.activeLoans}>
              <h3>My Active Loans</h3>
              <div className={styles.card}>
                <strong>Borrowed From : Carlos Muleke</strong>
                <p><span>MWK400000</span> for <span>2 weeks</span></p>
                <p>Interest : <span>7.8%</span></p>
                <p>Progress : <span style={{ color: 'red' }}>Due date in 2 days</span></p>
                <button onClick={() => navigate("/mark-paid")}>Mark as Paid</button>
              </div>
            </section>
          </main>
        </div>
      </div>
      <Footer className={styles.footer} />
    </>
  );
}

export default BorrowPage;
