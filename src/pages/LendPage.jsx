
import styles from '../styles/Lend.module.css';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
function LendPage() {

  const navigate = useNavigate();

  useEffect(() => {
                const originalDisplay = document.body.style.display;
                document.body.style.display = 'block';
                return () => {
                document.body.style.display = originalDisplay;
                  };
     }, []);
  return (
    <>
    <div className={styles.dashboard}>
      <header className={styles.header}>
      <Header/>
      </header>

      <h2 className={styles.title}>Support a fellow Student and earn interest</h2>

      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <h3>LOAN STATUS</h3>
          <ul>
            <li>Active Loans <b style={{color:'green'}}>(2)</b></li>
            <li>Completed loans <b style={{color:'green'}}>(0)</b></li>
          </ul>
        </aside>

        <main className={styles.main}>
          <section className={styles.loanRequests}>
            <h3>LOAN REQUESTS</h3>
            <div className={styles.card}>
              <strong>Amina Tinve</strong>
              <p>Asked for <span>MWK400000</span> for <span>2 weeks</span></p>
              <p>Interest: <span>7.8%</span></p>
              <button onClick={() => navigate("/view")}>View</button>
            </div>
            <div className={styles.card}>
              <strong>Jeke Muleke</strong>
              <p>Asked for <span>MWK20000</span> for <span>2 weeks</span></p>
              <p>Interest: <span>7.8%</span></p>
              <button onClick={() => navigate("/view")}>View</button>
            </div>
          </section>

          <section className={styles.activeLoans}>
            <h3>Active Loans</h3>
            <div className={styles.card}>
              <strong>Borrowed To : Selina Nkope</strong>
              <p>Offered <span>MWK400000</span> for <span>2 weeks</span></p>
              <p>Interest : <span>7.8%</span></p>
              <p>Progress : <span>One week</span></p>
              <button >Remind</button>
            </div>
          </section>
        </main>
      </div>
       
    </div>
    <Footer className={styles.footer}/>

</>
  );
}

export default LendPage;
