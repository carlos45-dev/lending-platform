import styles from '../styles/Lend.module.css';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LendPage() {
  const navigate = useNavigate();

  const [offers, setOffers] = useState([
    {
      amount: "400000",
      rate: "9.3",
      duration: "2"
    }
  ]);

  const [loanRequests] = useState([
    {
      name: "Amina Tinve",
      amount: "MWK400000",
      duration: "2 weeks",
      interest: "7.8%"
    },
    {
      name: "Jeke Muleke",
      amount: "MWK20000",
      duration: "2 weeks",
      interest: "7.8%"
    },
    
  ]);

  const [activeLoans] = useState([
    {
      borrower: "Selina Nkope",
      amount: "MWK400000",
      duration: "2 weeks",
      interest: "7.8%",
      progress: "One week"
    }
  ]);

  function sendReminder(name) {
    toast.success(` A reminder has been sent to ${name} `, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  }

  useEffect(() => {
    document.body.style.display = 'block';

    // Get offer from localStorage if available
    const newOffer = JSON.parse(localStorage.getItem('newOffer'));
    if (newOffer) {
      setOffers(prev => [...prev, newOffer]);
      localStorage.removeItem('newOffer'); // clear after use
    }

    return () => {
      document.body.style.display = 'initial';
    };
  }, []);

  return (
    <>
      <div className={styles.dashboard}>
        <header className={styles.header}>
          <Header />
        </header>

        <h2 className={styles.title}>Support a fellow Student and earn interest</h2>

        <div className={styles.container}>
          <aside className={styles.sidebar}>
            <h3>Current Offer</h3>
            {offers.map((offer, index) => (
              <ul key={index}>
                <li>Offering <b style={{ color: 'green' }}>MKW{offer.amount}</b></li>
                <li>Rate <b style={{ color: 'green' }}>{offer.rate}%</b></li>
                <li>Duration <b style={{ color: 'green' }}>{offer.duration} Weeks</b></li>
              </ul>
            ))}
            <button className={styles.addOfferBtn} onClick={() => navigate("/add-offer")}>Add a new offer</button>
          </aside>

          <main className={styles.main}>
            <section className={styles.loanRequests}>
              <h3>LOAN REQUESTS</h3>
              {loanRequests.map((request, index) => (
                <div className={styles.card} key={index}>
                  <strong>{request.name}</strong>
                  <p>Asked for <span>{request.amount}</span> for <span>{request.duration}</span></p>
                  <p>Interest: <span>{request.interest}</span></p>
                  <button onClick={() => navigate("/view")}>View</button>
                </div>
              ))}
            </section>

            <section className={styles.activeLoans}>
              <h3>Active Loans</h3>
              {activeLoans.map((loan, index) => (
                <div className={styles.card} key={index}>
                  <strong>Borrowed To : {loan.borrower}</strong>
                  <p>Offered <span>{loan.amount}</span> for <span>{loan.duration}</span></p>
                  <p>Interest : <span>{loan.interest}</span></p>
                  <p>Progress : <span>{loan.progress}</span></p>
                  <button onClick={() => sendReminder(loan.borrower)}>Remind</button>
                </div>
              ))}
            </section>
          </main>
        </div>
      </div>

      <ToastContainer />
      <Footer className={styles.footer} />
    </>
  );
}

export default LendPage;
