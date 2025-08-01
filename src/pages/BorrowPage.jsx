import styles from '../styles/Lend.module.css';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';

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
  }, [currentUser]); // Add currentUser to re-fetch on auth change

  const fetchActiveLoans = async () => {
    if (!currentUser) {
      console.log('No user, skipping fetchActiveLoans');
      return;
    }
    try {
      const q = query(collection(db, 'activeLoans'), where('borrowerId', '==', currentUser.uid));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log('Fetched active loans:', data);
      setActiveLoans(data);
    } catch (err) {
      console.error('Error fetching active loans:', err);
    }
  };

  const filteredOffers = offers.filter(
    (offer) => offer.lenderId !== currentUser?.uid
  );

  return (
    <>
      <div className={styles.dashboard}>
        <header className={styles.header}>
          <Header style={{ color: '#1A2258', backgroundColor: 'white' }} />
        </header>

        <h2 className={styles.title}>Find trusted fellow Students Lenders</h2>

        <div className={styles.container}>
          <aside className={styles.sidebar}>
            <h3>My Borrowed Loans</h3>
            {activeLoans.length === 0 ? (
              <p style={{ color: 'gray' }}>No active loans.</p>
            ) : (
              activeLoans.map((loan) => {
                // Calculate totalRepay using the rate for the current week
                let totalRepay;
                if (loan.interestBreakdown?.length && loan.progressWeeks !== undefined) {
                  const currentWeekRate = loan.interestBreakdown.find(
                    (item) => item.week === loan.progressWeeks
                  )?.rate || 0;
                  totalRepay = parseFloat(loan.amount) * (1 + currentWeekRate / 100);
                } else {
                  // Fallback to loan.interest or 0
                  totalRepay = parseFloat(loan.amount) * (1 + (loan.interest || 0) / 100);
                }

                const isFullyPaid = parseFloat(loan.amountPaid || 0) >= totalRepay;
                const due = loan.dueDate?.toDate();
                const overdue = due && new Date() > due;

                return (
                  <div className={styles.card} key={loan.id}>
                    <strong>Borrowed From: {loan.lenderUsername || 'N/A'}</strong>
                    <p>Amount Borrowed: MWK {loan.amount}</p>
                    <p>
                      Interest Rate:{' '}
                      {loan.interestBreakdown?.length && loan.progressWeeks !== undefined
                        ? (() => {
                            const rateObj = loan.interestBreakdown.find(
                              (item) => item.week === loan.progressWeeks
                            );
                            return rateObj ? `${rateObj.rate}% (Week ${rateObj.week})` : 'N/A';
                          })()
                        : loan.interest !== undefined
                        ? `${loan.interest}%`
                        : 'N/A'}
                    </p>
                    <p>Amount Returned: MWK {loan.amountPaid || 0} / {totalRepay.toFixed(2)}</p>
                    <p>
                      Paid On:{' '}
                      {loan.paidDate
                        ? (loan.paidDate instanceof Timestamp
                            ? loan.paidDate.toDate()
                            : new Date(loan.paidDate)
                          ).toDateString()
                        : 'Not yet paid'}
                    </p>
                    <p>Start: {loan.startDate?.toDate().toDateString()}</p>
                    <p>Due: {due?.toDateString()}</p>
                    <p>Progress: {loan.progressWeeks}/{loan.weeks} weeks</p>
                    {overdue && !isFullyPaid && (
                      <p className={styles.overdue} style={{ color: 'red' }}>
                        ⚠️ Overdue!
                      </p>
                    )}
                    <button onClick={() => navigate('/mark-paid', { state: { loan } })}>
                      Mark as Paid
                    </button>
                  </div>
                );
              })
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
                      Offers Up To <span>MWK{offer.amount}</span> for{' '}
                      <span>
                        {offer.weeklyRates?.length || 1}{' '}
                        {(offer.weeklyRates?.length || 1) === 1 ? 'week' : 'weeks'}
                      </span>
                    </p>
                    <p>
                      <b>Interest Breakdown:</b>
                    </p>
                    <ul style={{ paddingLeft: '20px', marginTop: '4px' }}>
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