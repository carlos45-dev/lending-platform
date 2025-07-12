import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/View.module.css';
import user from "../assets/user.jfif";
import { useEffect } from 'react';

function View() {
    useEffect(() => {
                    const originalDisplay = document.body.style.display;
                    document.body.style.display = 'block';
                    return () => {
                    document.body.style.display = originalDisplay;
                      };
         }, []);
  return (
    <>
  <div className={styles.wrapper}>
    <Header />
    <div className={styles.Viewcontainer}>
      <div>
        <img src={user} alt="Profile image" className={styles.profileImage} />
      </div>
      <div className={styles.details}>
        <p><strong>Phone:</strong> 0992779347</p>
        <p><strong>Student email:</strong> bsc-02-23@unima.ac.mw</p>
        <p><strong>Requested amount:</strong> MWK588888</p>
        <p><strong>Loan duration:</strong> 2 weeks</p>
         <button className={styles.lendButton}>Lend</button>
      </div>
    </div>
    <Footer />
  </div>
</>

  );
}

export default View;
