
import styles from '../styles/Lend.module.css';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useEffect } from 'react';
function BorrowPage() {

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

      <h2 className={styles.title}>Find trusted fellow Students Lenders</h2>

      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <h3>My Loan Summary</h3>
          <ul>
            <li>Completed Loans <b style={{color:'green'}}>(2)</b></li>
            <li>Overdue Loan <b style={{color:'red'}}>(1)</b></li>
          </ul>
        </aside>

        <main className={styles.main}>
          <section className={styles.loanRequests}>
            <h3>Student Lenders Available</h3>
            <div className={styles.card}>
              <strong>Amina Tinve</strong>
              <p>Offers Up To <span>MWK400000</span> for <span>2 weeks</span></p>
              <p>Interest: <span>7.8%</span></p>
              <button>Borrow</button>
            </div>
            <div className={styles.card}>
              <strong>Jeke Muleke</strong>
              <p>Offerer Up To  <span>MWK20000</span> for <span>2 weeks</span></p>
              <p>Interest: <span>7.8%</span></p>
              <button>Borrow</button>
            </div>
          </section>

          <section className={styles.activeLoans}>
            <h3>My Active Loans</h3>
            <div className={styles.card}>
              <strong>Borrowed From : Carlos Muleke</strong>
              <p><span>MWK400000</span> for <span>2 weeks</span></p>
              <p>Interest : <span>7.8%</span></p>
              <p>Progress : <span style={{color:'red'}}>Due date in 2 days</span></p>
              <button>Repay</button>
            </div>
          </section>
        </main>
      </div>
       
    </div>
    <Footer className={styles.footer}/>

</>
  );
}

export default BorrowPage;
