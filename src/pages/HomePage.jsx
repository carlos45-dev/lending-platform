import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from '../styles/HomePage.module.css';
import img from '../assets/HomeImage.png';
import img2 from '../assets/tracking.jfif';
import img3 from '../assets/Lend.jfif';
import img4 from '../assets/borrow.jfif';
import img5 from '../assets/history.jfif';
import Services from "../components/Services";
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function HomePage() {
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();
  const auth = getAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const originalDisplay = document.body.style.display;
    document.body.style.display = 'block';

    // Check authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/'); // Redirect to login if not authenticated
      }
      setLoading(false); // Set loading to false once auth state is resolved
    });

    return () => {
      document.body.style.display = originalDisplay;
      unsubscribe();
    };
  }, [navigate, auth]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: '#1A2258' }}>
        Loading...
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className={styles.intro}>
      <h3
        style={{
          textAlign: 'center',
          paddingTop: '10px',
          fontFamily: 'Inter',
          marginTop: '80px',
          color: '#1A2258'
        }}
      
        className={styles.welcome}
      >
        Welcome Back {userData?.username || 'Guest'}
      </h3>

      </div>

      {/* Comment section */}
      <p
        style={{
          textAlign: 'center',
          padding: '10px',
          fontFamily: 'Inter',
          marginTop: '50px',
          color: '#1A2258'
        }}
      >
        💬 'I borrowed K30,000 for textbooks and paid it off in 3 months — super helpful!' — James, UNIMA
      </p>

      {/* Cards to display services offered by unifund */}
      <div id="services" className={styles.servicesContainer}>
        <Services title={<p> Lend <br /> Money</p>} image={img3} onClick={() => navigate("/lend")} />
        <Services title={<p>Borrow <br/> Money</p>} image={img4} onClick={() => navigate("/borrow")} />
        <Services title={<p>Loan <br/> History</p>} image={img5} onClick={() => navigate("/loan-history")} />
        <Services title={<p>Track <br/> Payments</p>} image={img2} onClick={() => navigate("/track-payments")} />
      </div>

      {/* Impact on campus */}
      <h2 style={{ textAlign: 'center' }}>Our impact on campus</h2>
      <div className={styles.impact}>
        <div className={styles.processed}>
          <h4>+250</h4>
          <p>Processed loans</p>
        </div>
        <div className={styles.processed}>
          <h4>+$5000</h4>
          <p>Total amount processed</p>
        </div>
        <div className={styles.processed}>
          <h4>99%</h4>
          <p>Payment rate</p>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default HomePage;